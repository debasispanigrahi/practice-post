import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [FormsModule],
  styles: ``,
  templateUrl: './content.component.html',
  providers: [ProductService],
})
export class ContentComponent {
  product: Product;
  constructor(private productService: ProductService, private router: Router) {
    this.product = {
      active: true,
      category: null,
      id: uuidv4(),
      name: null,
      price: null,
    };
  }
  async addProduct(e: Event) {
    e.preventDefault();
    await this.productService.addProduct({
      ...this.product,
      active: !!this.product.active,
    });
    this.router.navigateByUrl('');
  }
}
