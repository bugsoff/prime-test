import * as _type from "./types.js";

const api = {
	init: "/api/load-data",
	category: "/api/get-category/",
	categories: "/api/get-categories-list/",
	productlist: "/api/get-product-list/",
	product: "/api/get-product/",
};

async function get(type: string, data: string): Promise<object | _type.IAPIError> {
	let responce: Response, receive: string, result: object;
	try {
		responce = await fetch(api[type as keyof typeof api] + (data ? `?${data}` : ""));
	} catch (e) {
		return {error: e};
	}
	if (!responce.ok) {
		return {error: "HTTP Error: " + responce.status};
	}
	try {
		receive = await responce.text();
	} catch (e) {
		return {error: e};
	}
	try {
		result = await JSON.parse(receive);
	} catch (e) {
		return {error: e, data: receive};
	}
	return result;
}

export {get};
