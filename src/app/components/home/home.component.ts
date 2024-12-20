import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductService } from '../../features/products/product.service';
import { CategoriesService } from '../../features/categories/categories.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products: any[] = [];
  categories: any[] = [];  // Changez ici pour un tableau
  activeCategory: string = 'All';  // Par défaut, on affiche tout

  constructor(private productService: ProductService, private categorieService: CategoriesService) {}

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllCategories() {
    this.categorieService.getCategories().subscribe(
      (data) => {
        this.categories = data;  // Assurez-vous que 'data' est un tableau de catégories
        console.log('Categories chargées:', this.categories);
      }
    );
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      console.log('Produits chargés :', data);
      this.products = data;
    });
  }

  // Méthode pour définir la catégorie active
  setActiveCategory(category: string) {
    this.activeCategory = category;
  }

  // Méthode pour obtenir les produits filtrés
  getFilteredProducts() {
    if (this.activeCategory === 'All') {
      return this.products;
    }
    return this.products.filter(product => product.category === this.activeCategory);
  }
}
