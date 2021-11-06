import * as api from "./api.js";
import * as gui from "./gui.js";
export async function Categories() {
    let result;
    result = (await api.get("categories", ""));
    if ("error" in result)
        gui.showError(result);
    else
        gui.showCategories(result);
}
export async function Category(cid, start) {
    var _a, _b;
    let result;
    result = (await api.get("category", "cid=" + cid));
    if ("error" in result)
        gui.showError(result);
    else {
        gui.setTitle((_a = result.name) !== null && _a !== void 0 ? _a : "Категория не найдена");
        let per_page = parseInt((_b = document.querySelector("#main").getAttribute("data-prd_per_page")) !== null && _b !== void 0 ? _b : "0");
        if (result.totalProducts > per_page) {
            gui.showPagination(result.totalProducts, per_page, start);
        }
    }
}
export async function ProductList(cid, start) {
    let result;
    result = (await api.get("productlist", "cid=" + cid + "&start=" + start));
    if ("error" in result)
        gui.showError(result);
    else {
        gui.showProductList(result);
        gui.setClose("/");
        Category(cid, start);
    }
}
export async function Product(pid) {
    var _a;
    let result;
    result = (await api.get("product", "pid=" + pid));
    if ("error" in result)
        gui.showError(result);
    else {
        gui.setTitle((_a = result.Name) !== null && _a !== void 0 ? _a : "Продукт не найден");
        gui.showProduct(result);
        gui.setClose(result.categoryId ? "/category/" + result.categoryId : "/");
    }
}
