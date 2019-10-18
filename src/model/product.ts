export class Product {
  _id: string;
	title: string;
	url: string[];
  price	: number;
  description: string;
  subproducts: string;
  public updateFrom(src: Product): void {
    this._id = src._id;
    this.title = src.title;
    this.description = src.description;
    this.price = src.price;
    this.subproducts = src.subproducts
   }
  }

