import { CartItem } from "./cart-item";

export class ShoppingCart {
  public items: CartItem[] = new Array<CartItem>();

  public grossTotal: number = 0;

  public itemsTotal: number = 0;
  public url: string[];

  public updateFrom(src: ShoppingCart) {
    this.items = src.items;

    this.grossTotal = src.grossTotal;

    this.itemsTotal = src.itemsTotal;
  }
}
