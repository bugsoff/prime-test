var _a;
import * as load from "./load.js";
let [cid_s, start_s] = ((_a = window.location.href.split("/").pop()) !== null && _a !== void 0 ? _a : "").split("?p=");
let cid = parseInt(cid_s !== null && cid_s !== void 0 ? cid_s : 0);
let start = isNaN(parseInt(start_s)) ? 0 : parseInt(start_s);
load.ProductList(cid, start);
