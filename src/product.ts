import * as load from "./load.js";
import * as gui from "./gui.js";

let pid: number = parseInt(window.location.pathname.split("/").pop() ?? "");

load.Product(pid);
