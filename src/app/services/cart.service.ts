import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart  = signal<Product[]>([]);
  totalItems = computed(() => this.cart()?.length);
  amount = computed(() => 
    this.cart()?.reduce((prev:number, current:Product) => prev + current.price, 0)
);

  private productService = inject(ProductsService);
  addProduct(product: Product) {
    this.cart.update((products) => [...products, product]);
    this.productService.products()?.forEach((p) => {
      if (p.id === product.id) {
        p.rating.count = p.rating.count - 1;
      }
    });
  }

  removeProduct(index: Product) {
    this.cart.mutate((products) => {
      const product = products.splice(products.indexOf(index), 1);
      this.productService.products()?.forEach((p) => {
        if (p.id === product[0]?.id) {
          p.rating.count = p.rating.count + 1;
        }
      });

      return products;
    })
  }
}
