import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/v1/products';

  constructor(private httpClient: HttpClient) {}

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  public getProductList(): Observable<Product[]> {
    const ProductsUrl = `${this.baseUrl}`;
    return this.httpClient
      .get<GetResponce>(ProductsUrl)
      .pipe(map((response) => response.content));
  }

  public getProductListPaginate(
    theCategoryId: number,
    thePage: number,
    thePageSize: number
  ): Observable<GetResponce> {
    const ProductsUrl = `${this.baseUrl}/category?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponce>(ProductsUrl);
  }

  public searchProductsPaginate(
    theKeyword: String,
    thePage: number,
    thePageSize: number
  ): Observable<GetResponce> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponce>(searchUrl);
  }

  public searchProducts(theKeyword: String): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.httpClient
      .get<GetResponce>(searchUrl)
      .pipe(map((response) => response.content));
  }

  public getProductsByCategoryId(id: number): Observable<Product[]> {
    const productsByCategoryUrl = `${this.baseUrl}/category?id=${id}`;
    return this.httpClient
      .get<GetResponce>(productsByCategoryUrl)
      .pipe(map((response) => response.content));
  }
}
export interface GetResponce {
  content: Product[];

  totalPage: number;
  totalElements: number;
  size: number;
  number: number;
}
