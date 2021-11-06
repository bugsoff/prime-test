var _a;
import * as load from "./load.js";
let pid = parseInt((_a = window.location.pathname.split("/").pop()) !== null && _a !== void 0 ? _a : "");
load.Product(pid);
