export function showError(e) {
    var _a, _b, _c;
    let err = document.createElement("div");
    err.className = "container-xl bg-warning m-4 p-4";
    err.innerHTML = `<h4>Произошла ошибка:</h4>
                     <p>${(_a = e.error) !== null && _a !== void 0 ? _a : "Неизвестно"}</p>
                     <p>${(_b = e.data) !== null && _b !== void 0 ? _b : ""}</p>`;
    (_c = document.querySelector("#main")) === null || _c === void 0 ? void 0 : _c.append(err);
}
export function showCategories(Categories) {
    var _a;
    if (Categories.length)
        Categories.forEach(category => {
            var _a;
            let div = document.createElement("div");
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
            (_a = document.querySelector("#main")) === null || _a === void 0 ? void 0 : _a.append(div);
        });
    else {
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="bg-warning p-4">
            <p></p>База данных пустая</p>
            <p><a href="/init">Перейти на страницу загрузки данных</a></p>
        </div>
        `;
        (_a = document.querySelector("#main")) === null || _a === void 0 ? void 0 : _a.append(div);
    }
}
export function showProductList(ProductList) {
    var _a, _b;
    if (ProductList.length) {
        let div = document.createElement("div");
        div.className = "row";
        for (let product of ProductList) {
            div.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 g-1">
                <div class="card p-1 m-2 h-100 text-center bg-light">
                    <img src="${product.Picture}" class="card-img-top" alt="${product.Name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.Name}</h5>
                        <p class="card-text h6 my-3">Цена: ${product.Price} руб. </p>
                        <span class="small text-secondary">В наличии: ${product.InStock < 10000000 ? product.InStock : "Неизвестно"}</span>                        
                    <div class="text-center mt-2"><a href="/product/${product.prod_id}" class="btn btn-primary">Подробнее</a></div>
                </div>
            </div>
            `;
            (_a = document.querySelector("#main")) === null || _a === void 0 ? void 0 : _a.append(div);
        }
    }
    else {
        let div = document.createElement("div");
        div.className = "row";
        div.innerHTML = '<div class="col-12"><p class="bg-info m-4 p-4">Не найдено товаров в данной категории</p></div>';
        (_b = document.querySelector("#main")) === null || _b === void 0 ? void 0 : _b.append(div);
    }
}
export function showProduct(Product) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    if (Product.id) {
        let div = document.createElement("div");
        div.className = "row product";
        div.innerHTML = `
        <div class="col-12 col-xl-4">
            <img class="img-thumbnail border-0" src="${Product.Picture}" />
        </div>
        <div class="col-12 col-xl-8">
            <p class="lead p-4">${(_a = Product.Annotation) !== null && _a !== void 0 ? _a : ""}</p>
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
                    <tr><td>Производитель</td><td>${(_b = Product.Vendor) !== null && _b !== void 0 ? _b : ""}</td></tr>
                    <tr><td>Модель</td><td>${(_c = Product.Model) !== null && _c !== void 0 ? _c : ""}</td></tr>
                    <tr><td>Тип продукта</td><td>${(_d = Product.TypePrefix) !== null && _d !== void 0 ? _d : ""}</td></tr>
                    <tr><td>Доступен для заказа</td><td>${Product.Available ? "Да" : "Нет"}</td></tr>
                    <tr><td>Можно скачать</td><td>${Product.Downloadable ? "Да" : "Нет"}</td></tr>
                    <tr><td>Цена</td><td>${(_e = Product.Price) !== null && _e !== void 0 ? _e : ""} руб.</td></tr>
                    <tr><td>Тип товара</td><td>${(_f = Product.ItemType) !== null && _f !== void 0 ? _f : ""}</td></tr>
                    <tr><td>Условия использования</td><td>${(_g = Product.TermsConditions) !== null && _g !== void 0 ? _g : ""}</td></tr>
                    <tr><td>Правила активации</td><td>${(_h = Product.ActivationRules) !== null && _h !== void 0 ? _h : ""}</td></tr>
                    <tr><td>Пользовательское соглашение</td><td>${(_j = Product.TermsOfUse) !== null && _j !== void 0 ? _j : ""}</td></tr>
                    <tr><td>Пользовательское соглашение</td><td>${(_k = Product.TermsOfUse) !== null && _k !== void 0 ? _k : ""}</td></tr>
                    <tr><td>Код типа</td><td>${(_l = Product.type) !== null && _l !== void 0 ? _l : ""}</td></tr>
                    <tr><td>Номинал</td><td>${(_m = Product.nominal) !== null && _m !== void 0 ? _m : ""}</td></tr>
                    <tr><td>Единица измерения номинала</td><td>${(_o = Product.nominal_unit) !== null && _o !== void 0 ? _o : ""}</td></tr>
                    <tr><td>Минимальная цена</td><td>${(_p = Product.min_price) !== null && _p !== void 0 ? _p : "?"} руб.</td></tr>
                    <tr><td>Максимальная цена</td><td>${(_q = Product.max_price) !== null && _q !== void 0 ? _q : "?"} руб.</td></tr>
                </tbody>
            </table>
        </div>
        <div class="col-xl-1 d-none d-xl-block"></div>
        `;
        (_r = document.querySelector("#main")) === null || _r === void 0 ? void 0 : _r.append(div);
    }
    else {
        let div = document.createElement("div");
        div.className = "row";
        div.innerHTML = '<div class="col-12"><p class="bg-warning m-4 p-4">Такого продукта не существует!</p></div>';
        (_s = document.querySelector("#main")) === null || _s === void 0 ? void 0 : _s.append(div);
    }
}
export const setTitle = (title) => (document.querySelector("#title").innerHTML = title);
export const setClose = (uri) => document.querySelector("#close").addEventListener("click", () => {
    window.location.href = uri;
});
export function showPagination(total, per_page, start) {
    var _a;
    let nav = document.createElement("nav");
    nav.className = "m-4";
    let list = "", npp = 3 * per_page;
    if (start > npp) {
        list += makePagelink(0, start, per_page);
        if (start > npp + per_page)
            list += `<li><span class="mx-3">...</span></li>`;
    }
    for (let i = Math.max(0, start - npp); i < Math.min(start + npp, total); i += per_page) {
        list += makePagelink(i, start, per_page);
    }
    if (start < total - npp) {
        console.log(`start=${start} < ${total - npp - per_page}`);
        if (start < total - npp - per_page)
            list += `<li><span class="mx-3">...</span></li>`;
        list += makePagelink(total - (total % per_page ? total % per_page : per_page), start, per_page);
    }
    nav.innerHTML = `<ul class="pagination">${list}</ul>`;
    (_a = document.querySelector("#main")) === null || _a === void 0 ? void 0 : _a.append(nav);
}
const makePagelink = (i, start, per_page) => i == start
    ? `<li class="page-item active"><span class="page-link">${Math.floor(i / per_page) + 1}</span></li>`
    : `<li class="page-item"><a class="page-link" href="${i ? `?p=${i}` : "?"}">${Math.floor(i / per_page) + 1}</a></li>`;
