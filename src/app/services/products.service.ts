import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop'; // Replace 'some-module' with the actual module name
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  products  =  toSignal<Product[]>(this.http.get<Product[]>('https://fakestoreapi.com/products'));
  
}
