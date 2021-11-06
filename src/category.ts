import * as load from "./load.js";

let [cid_s, start_s]: string[] = (window.location.href.split("/").pop() ?? "").split("?p=");

let cid: number = parseInt(cid_s ?? 0);
let start: number = isNaN(parseInt(start_s)) ? 0 : parseInt(start_s);

load.ProductList(cid, start);
