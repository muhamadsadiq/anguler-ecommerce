import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
@Injectable()
export class CategoryComponent implements OnInit {
  productCategories: ProductCategory[] = [];

  constructor(
    private router: Router,
    private productCategoryService: ProductCategoryService
  ) {}

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.productCategoryService.getProductCategoryList().subscribe((data) => {
      this.productCategories = data;
    });
  }
  categoryId(id: number) {
    this.router.navigateByUrl(`/category/${id + 1}`);
  }
}
