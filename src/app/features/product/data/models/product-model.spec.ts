import { ProductModel } from './product-model';

describe('ProductModel', () => {
  it('should create a ProductModel instance from valid JSON', () => {
    const data = {
      id: 1,
      title: 'Product Title',
      category: 'Category',
      description: 'Product Description',
      image: 'image-url',
      price: 100
    };

    const product = ProductModel.fromJson(data);

    expect(product).toBeInstanceOf(ProductModel);
    expect(product.id).toBe(1);
    expect(product.name).toBe('Product Title');
    expect(product.category).toBe('Category');
    expect(product.description).toBe('Product Description');
    expect(product.image).toBe('image-url');
    expect(product.price).toBe(100);
  });


});
