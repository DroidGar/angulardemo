export abstract class Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;

  protected constructor(id: number, name: string, category: string, description: string, image: string, price: number) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.image = image;
    this.price = price;
  }
}
