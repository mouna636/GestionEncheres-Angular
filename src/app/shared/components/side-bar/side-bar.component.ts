import { Component } from '@angular/core';
import { AddProductComponent } from '../../../features/products/add-product/add-product.component';
import { FormCategoryComponent } from '../../../features/categories/form-category/form-category.component';
import { ListCategoryComponent } from '../../../features/categories/list-category/list-category.component';
import { ListProductComponent } from '../../../features/products/list-product/list-product.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

}
