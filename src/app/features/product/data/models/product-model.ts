import {Product} from '../../domain/entity/product';

export class ProductModel extends Product {
  private constructor(id: number, name: string, category: string,
                      description: string, image: string, price: number) {
    super(id, name, category, description, image, price);
  }

  static fromJson(data: any): Product {
    return new ProductModel(data['id'], data['title'], data['category'], data['description'], data['image'], data['price']);
  }

}
