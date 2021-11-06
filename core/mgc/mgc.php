<?php

/** Общий класс для API-доступа к программе лояльности
  *  1. При создании объекта происходит авторизация на сервере MGC-Loyaltiy,
  *  2. либо загружается сохраненный токен доступа, если срок действия авторизации ещё не истёк
 */

class MGC
{
    const JSON_OPTIONS = JSON_NUMERIC_CHECK|JSON_UNESCAPED_SLASHES|JSON_HEX_QUOT;
    const api_uri = [
        "programs" => "programs/current"
    ];
    private string $JWT;

    private function auth()
    {
        $data = ["domain"=>__mgc_domain, "login"=>__mgc_login, "password"=>__mgc_pass];
        $result = $this ->query(MGC::api_uri["programs"], $data, false);
        if (($result['status']??false) === 'success') {
            $this->JWT = $result['data']['token'];
            $JWT['token'] = $this->JWT;
            $JWT['expires'] =  time() + $result['data']['token_expires_in'] - 1;
            file_put_contents(__root.DATA.__JWT_file, json_encode($JWT, JSON_NUMERIC_CHECK));
            return true;
        } else {
            Err::log($result['message']??"Server responce not recognized as JSON");
            return false;
        }
    }

    /**
     * Выполняет запрос к API MGC
     *
     * @param string $uri                   API метод
     * @param array|bool $data=null         массив данных  для тела POST-запроса; если данные не переданы - выполняется GET запрос
     * @param string|bool $auth=null        не обзятельный параметр данных для авторизации;
     *                                      если не передан (null) - авторизация по существующему JWT-токену;
     *                                      если передана строка авторизации (string) - включается в заголовок запроса;
     *                                      если передан false - не включается никаких данных авторизации;
     * @return array|bool                   массив с ответом от сервера MGC;
     *                                      если вернулся не JSON, то false
     */
    protected function query(string $uri, array $data=null, string $auth=null)
    {
        if (!isset($auth)) {
            $auth = ["Authorization: Bearer ".$this->JWT];
        } else {
            $auth = $auth?[$auth]:[];
        }
        if (__debug) {
            Err::log(__METHOD__." >> $uri data:".var_export($data, true));
        }
        if (!($handle = curl_init())) {
            throw new Err("cURL init false!");
        }
        if (!curl_setopt_array(
            $handle,
            [
            CURLOPT_URL => 				__mgc_apiendpoint_test.$uri,
            CURLOPT_HTTPHEADER =>		array_merge(["Content-Type: application/json"], $auth),
            CURLOPT_HEADER => 			false,
            CURLOPT_RETURNTRANSFER => 	true,
            CURLOPT_TIMEOUT => 			10,
            ]+($data
            ?[
                CURLOPT_CUSTOMREQUEST =>	"POST",
                CURLOPT_POSTFIELDS =>       json_encode($data, MGC::JSON_OPTIONS),
            ]
            :[
                CURLOPT_CUSTOMREQUEST =>	"GET",
            ])
        )) {
            throw new Err("cURL set options failed!");
        }
        
        if (($recv=curl_exec($handle))===false) {
            throw new Err(curl_error($handle));
        }
        curl_close($handle);
        if (__debug) {
            Err::log(__METHOD__." << ".(strlen($recv)>1024)?substr($recv, 0, 1024)." <...>":$recv);
        }
        return json_decode($recv, true)?:Err::log(var_export($recv, true));                                              // если в ответе не json, то запишем в лог ответ и вернем false
    }

    public function __construct()
    {
        if (file_exists(__root.DATA.__JWT_file)) {
            $JWT = json_decode(file_get_contents(__root.DATA.__JWT_file, true), true);
        } else {
            $JWT=false;
        }

        if (!($JWT??false) ||
            $JWT['expires'] < time()) {
            if (!$this->auth()) {
                throw new Err("Can't login to MGC-Loyality");
            }
        } else {
            $this->JWT = $JWT['token'];
        }
    }
}
