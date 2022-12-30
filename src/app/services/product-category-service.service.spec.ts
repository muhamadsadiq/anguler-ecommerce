import { TestBed } from '@angular/core/testing';

import { ProductCategoryServiceService } from './product-category-service.service';

describe('ProductCategoryServiceService', () => {
  let service: ProductCategoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCategoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
