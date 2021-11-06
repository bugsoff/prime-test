export interface ICategory {
	id: number;
	domain_id: number;
	categoryId: number;
	parentId: number;
	name: string;
	totalProducts: number;
	Params: string;
	translit_name: string;
}

export interface IProductList {
	prod_id: number;
	Name: string;
	InStock: number;
	Price: number;
	Picture: string | boolean;
}

export interface IProduct {
	id: number;
	domain_id: number;
	prod_id: number;
	GroupId: number;
	categoryId: number;
	parentId: number;
	Name: string;
	Vendor: string;
	Model: string;
	TypePrefix: string;
	DealerID: number;
	InStock: number;
	Available: true;
	Downloadable: true;
	Price: number;
	ItemType: string;
	Category: string;
	Picture: string;
	Annotation: string;
	TermsConditions: string;
	ActivationRules: string;
	TermsOfUse: string;
	Params: string;
	type: string;
	nominal: number;
	nominal_unit: string;
	min_price: number;
	max_price: number;
}

export interface IAPIError {
	error: string;
	data?: string;
}
