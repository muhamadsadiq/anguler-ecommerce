import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private baseUrl = 'http://localhost:8080/api/v1/productCategory';

  constructor(private httpClient: HttpClient) {}

  public getProductCategoryList(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.baseUrl).pipe();
  }
}
