import * as _type from "./types.js";
import * as api from "./api.js";
import * as gui from "./gui.js";

export async function Categories() {
	let result: _type.ICategory[] | _type.IAPIError;
	result = (await api.get("categories", "")) as _type.ICategory[] | _type.IAPIError;
	if ("error" in result) gui.showError(result);
	else gui.showCategories(result);
}

export async function Category(cid: number, start: number) {
	let result: _type.ICategory | _type.IAPIError;
	result = (await api.get("category", "cid=" + cid)) as _type.ICategory | _type.IAPIError;
	if ("error" in result) gui.showError(result);
	else {
		gui.setTitle(result.name ?? "Категория не найдена");
		let per_page: number = parseInt(
			(<HTMLDivElement>document.querySelector("#main")).getAttribute("data-prd_per_page") ?? "0"
		);
		if (result.totalProducts > per_page) {
			gui.showPagination(result.totalProducts, per_page, start);
		}
	}
}

export async function ProductList(cid: number, start: number) {
	let result: _type.IProductList[] | _type.IAPIError;
	result = (await api.get("productlist", "cid=" + cid + "&start=" + start)) as _type.IProductList[] | _type.IAPIError;
	if ("error" in result) gui.showError(result);
	else {
		gui.showProductList(result);
		gui.setClose("/");
		Category(cid, start);
	}
}

export async function Product(pid: number) {
	let result: _type.IProduct | _type.IAPIError;
	result = (await api.get("product", "pid=" + pid)) as _type.IProduct | _type.IAPIError;
	if ("error" in result) gui.showError(result);
	else {
		gui.setTitle(result.Name ?? "Продукт не найден");
		gui.showProduct(result);
		gui.setClose(result.categoryId ? "/category/" + result.categoryId : "/");
	}
}
