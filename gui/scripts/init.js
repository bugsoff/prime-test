var _a;
import * as api from "./api.js";
(_a = document.querySelector("#init")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", async () => {
    let div = document.createElement("div");
    div.innerHTML = `
        <div class="spinner-border m-5" role="status">            
        </div>`;
    let main = document.querySelector("#main");
    main.append(div);
    let result = (await api.get("init", ""));
    let log = `<div class="m-4">` +
        (result["MGS auth"] == "OK" ? "<p>Авторизация на сервере MGC-loyality: <b>OK</b></p>" : "Ошибка") +
        `<p>Загружено категорий: <b>${result.LOAD.Categories}</b></p>` +
        `<p>Загружено товаров: <b>${result.LOAD.Products}</b></p>` +
        (result["DB init"] == "OK" ? "<p>Создание базы данных: <b>OK</b></p>" : "Ошибка") +
        `<p>Сохранено категорий: <b>${result.SAVE.Categories}</b></p>` +
        `<p>Сохранено товаров: <b>${result.SAVE.Products}</b></p>` +
        `<a href="/">Вернуться на главную</a>` +
        `</div>`;
    div.innerHTML = log;
});
