import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardItem } from 'src/app/common/card-item';
import { Product } from 'src/app/common/product';
import { CardService } from 'src/app/services/card-service.service';
import { ProductService } from 'src/app/services/product-service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private route: ActivatedRoute,private productService:ProductService,private cardService:CardService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() { 
    
    const productId:number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(productId).subscribe(
      data =>{
        this.product = data;
      }
    )

  }
  addToCard(product:Product){
  const cardItem:CardItem=new CardItem(product);

  this.cardService.addToCard(cardItem);

  }

}
