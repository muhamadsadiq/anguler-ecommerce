import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  searchMode: boolean = false;
  previousKeyword: String = '';

  currentCategoryId: number = 1;
  previousCategoryId: number = 1;

  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProductsByCategory();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (theKeyword !== this.previousKeyword) {
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;
    this.productService
      .searchProductsPaginate(
        theKeyword,
        this.thePageNumber - 1,
        this.thePageSize
      )
      .subscribe((data) => {
        this.products = data.content;
        this.thePageNumber = data.number + 1;
        this.thePageSize = data.size;
        this.theTotalElements = data.totalElements;
      });
  }
  handleListProductsByCategory() {
    if (this.route.snapshot.paramMap.has('categoryId')) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('categoryId')!;
    } else {
      this.currentCategoryId = 1;
    }
    if (this.currentCategoryId != this.previousCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    this.productService
      .getProductListPaginate(
        this.currentCategoryId,
        this.thePageNumber - 1,
        this.thePageSize
      )
      .subscribe((data) => {
        this.products = data.content;
        this.thePageNumber = data.number + 1;
        this.thePageSize = data.size;
        this.theTotalElements = data.totalElements;
      });
  }

  addToCart(product: Product) {
    console.log(`Adding to cart: ${product.name} ,${product.unitPrice}`);

    const cartItem: CartItem = new CartItem(product);

    this.cartService.addToCart(cartItem);
  }
}
