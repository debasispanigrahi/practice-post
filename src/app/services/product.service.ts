import { Injectable } from '@angular/core';
import axios, { Axios } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private axiosInstance: Axios;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  findAllProduct() {
    return this.axiosInstance.get<Product[]>('./products');
  }
  toggleActiveProduct(active: Boolean, id: string) {
    return this.axiosInstance.patch<Product>(`./products/${id}`, { active });
  }
  deleteProduct(id: string) {
    return this.axiosInstance.delete(`./products/${id}`);
  }
  addProduct(payload: Omit<Product, 'id'>) {
    return this.axiosInstance.post('./products', payload);
  }
}
