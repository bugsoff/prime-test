import * as _type from "./types";

export function showError(e: _type.IAPIError) {
	let err: HTMLDivElement = <HTMLDivElement>document.createElement("div");
	err.className = "container-xl bg-warning m-4 p-4";
	err.innerHTML = `<h4>Произошла ошибка:</h4>
                     <p>${e.error ?? "Неизвестно"}</p>
                     <p>${e.data ?? ""}</p>`;
	document.querySelector("#main")?.append(err);
}

export function showCategories(Categories: _type.ICategory[]) {
	if (Categories.length)
		Categories.forEach(category => {
			let div: HTMLDivElement = <HTMLDivElement>document.createElement("div");
			div.className = "row";
			div.innerHTML = `
            <div class="col-2"></div>
            <div class="col-8">
                <div class="category p-0 my-3 bg-light border-5 border-start rounded-start 
                            ${category.totalProducts ? "border-primary" : "border-secondary"}">
                    <div class="p-4 ${category.totalProducts ? "active" : "opacity-50"}">
                        <h3 >${category.name}</h3>
                        <p>Товаров в категории: ${category.totalProducts}</p>
                    </div>
                </div>
            </div>
            <div class="col-2"></div>
        `;
			if (category.totalProducts)
				div.addEventListener("click", () => {
					window.document.location.href = "/category/" + category.categoryId;
				});
			document.querySelector("#main")?.append(div);
		});
	else {
		let div: HTMLDivElement = <HTMLDivElement>document.createElement("div");
		div.innerHTML = `
        <div class="bg-warning p-4">
            <p></p>База данных пустая</p>
            <p><a href="/init">Перейти на страницу загрузки данных</a></p>
        </div>
        `;
		document.querySelector("#main")?.append(div);
	}
}

export function showProductList(ProductList: _type.IProductList[]) {
	if (ProductList.length) {
		let div: HTMLDivElement = <HTMLDivElement>document.createElement("div");
		div.className = "row";
		for (let product of ProductList) {
			div.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 g-1">
                <div class="card p-1 m-2 h-100 text-center bg-light">
                    <img src="${product.Picture}" class="card-img-top" alt="${product.Name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.Name}</h5>
                        <p class="card-text h6 my-3">Цена: ${product.Price} руб. </p>
                        <span class="small text-secondary">В наличии: ${
							product.InStock < 10000000 ? product.InStock : "Неизвестно"
						}</span>                        
                    <div class="text-center mt-2"><a href="/product/${
						product.prod_id
					}" class="btn btn-primary">Подробнее</a></div>
                </div>
            </div>
            `;
			document.querySelector("#main")?.append(div);
		}
	} else {
		let div: HTMLDivElement = <HTMLDivElement>document.createElement("div");
		div.className = "row";
		div.innerHTML = '<div class="col-12"><p class="bg-info m-4 p-4">Не найдено товаров в данной категории</p></div>';
		document.querySelector("#main")?.append(div);
	}
}

export function showProduct(Product: _type.IProduct) {
	if (Product.id) {
		let div: HTMLDivElement = <HTMLDivElement>document.createElement("div");
		div.className = "row product";
		div.innerHTML = `
        <div class="col-12 col-xl-4">
            <img class="img-thumbnail border-0" src="${Product.Picture}" />
        </div>
        <div class="col-12 col-xl-8">
            <p class="lead p-4">${Product.Annotation ?? ""}</p>
            <p class="bg-light p-2 m-4 w-50 text-center text-primary">
                <span class="ms-4">Цена:&nbsp;${Product.Price}&nbsp;руб.</span>
                <span class="ms-4">В&nbsp;наличии:&nbsp;${Product.InStock < 10000000 ? Product.InStock : "Неизвестно"}</span>
            </p>            
        </div>
        <div class="col-xl-1 d-none d-xl-block"></div>
        <div class="col-12 col-xl-10">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>      
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Производитель</td><td>${Product.Vendor ?? ""}</td></tr>
                    <tr><td>Модель</td><td>${Product.Model ?? ""}</td></tr>
                    <tr><td>Тип продукта</td><td>${Product.TypePrefix ?? ""}</td></tr>
                    <tr><td>Доступен для заказа</td><td>${Product.Available ? "Да" : "Нет"}</td></tr>
                    <tr><td>Можно скачать</td><td>${Product.Downloadable ? "Да" : "Нет"}</td></tr>
                    <tr><td>Цена</td><td>${Product.Price ?? ""} руб.</td></tr>
                    <tr><td>Тип товара</td><td>${Product.ItemType ?? ""}</td></tr>
                    <tr><td>Условия использования</td><td>${Product.TermsConditions ?? ""}</td></tr>
                    <tr><td>Правила активации</td><td>${Product.ActivationRules ?? ""}</td></tr>
                    <tr><td>Пользовательское соглашение</td><td>${Product.TermsOfUse ?? ""}</td></tr>
                    <tr><td>Пользовательское соглашение</td><td>${Product.TermsOfUse ?? ""}</td></tr>
                    <tr><td>Код типа</td><td>${Product.type ?? ""}</td></tr>
                    <tr><td>Номинал</td><td>${Product.nominal ?? ""}</td></tr>
                    <tr><td>Единица измерения номинала</td><td>${Product.nominal_unit ?? ""}</td></tr>
                    <tr><td>Минимальная цена</td><td>${Product.min_price ?? "?"} руб.</td></tr>
                    <tr><td>Максимальная цена</td><td>${Product.max_price ?? "?"} руб.</td></tr>
                </tbody>
            </table>
        </div>
        <div class="col-xl-1 d-none d-xl-block"></div>
        `;
		document.querySelector("#main")?.append(div);
	} else {
		let div: HTMLDivElement = <HTMLDivElement>document.createElement("div");
		div.className = "row";
		div.innerHTML = '<div class="col-12"><p class="bg-warning m-4 p-4">Такого продукта не существует!</p></div>';
		document.querySelector("#main")?.append(div);
	}
}

export const setTitle = (title: string) => (document.querySelector("#title")!.innerHTML = title);
export const setClose = (uri: string) =>
	document.querySelector("#close")!.addEventListener("click", () => {
		window.location.href = uri;
	});

export function showPagination(total: number, per_page: number, start: number) {
	let nav: HTMLDivElement = <HTMLDivElement>document.createElement("nav");
	nav.className = "m-4";
	let list: string = "",
		npp = 3 * per_page;
	if (start > npp) {
		list += makePagelink(0, start, per_page);
		if (start > npp + per_page) list += `<li><span class="mx-3">...</span></li>`;
	}
	for (let i: number = Math.max(0, start - npp); i < Math.min(start + npp, total); i += per_page) {
		list += makePagelink(i, start, per_page);
	}
	if (start < total - npp) {
		if (start < total - npp - per_page) list += `<li><span class="mx-3">...</span></li>`;
		list += makePagelink(total - (total % per_page ? total % per_page : per_page), start, per_page);
	}
	nav.innerHTML = `<ul class="pagination">${list}</ul>`;
	document.querySelector("#main")?.append(nav);
}

const makePagelink = (i: number, start: number, per_page: number): string =>
	i == start
		? `<li class="page-item active"><span class="page-link">${Math.floor(i / per_page) + 1}</span></li>`
		: `<li class="page-item"><a class="page-link" href="${i ? `?p=${i}` : "?"}">${Math.floor(i / per_page) + 1}</a></li>`;
