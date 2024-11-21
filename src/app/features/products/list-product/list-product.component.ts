import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [NgFor,CommonModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit {
  products: any[] = [];
  constructor(private productService:ProductService){}
  ngOnInit(){
   this.getAllProducts();
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      console.log('Produits chargés :', data);
      this.products = data;
    });
   
  }


}
