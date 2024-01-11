import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../elements/modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './home.component.html',
  providers: [ProductService],
})
export class HomeComponent implements OnInit {
  products: Product[];
  modal: string = '';
  modalPlaceholder: string = '';

  constructor(private productService: ProductService, private router: Router) {
    this.products = [];
  }
  async ngOnInit(): Promise<void> {
    this.products = (await this.productService.findAllProduct()).data;
  }
  consoleContent(data: unknown): string {
    return JSON.stringify(data, null, 4);
  }
  async toggleActive(item: Product) {
    item.active = !item.active;
    const { active } = (
      await this.productService.toggleActiveProduct(item.active, item.id)
    ).data;
    item.active = active;
  }
  async confirmDeleteProduct(item: Product) {
    this.modal = item.id;
    this.modalPlaceholder = item.name||'';
  }
  closeModal() {
    this.modal = this.modalPlaceholder = '';
  }
  async proceedDelete(pid: string) {
    await this.productService.deleteProduct(pid);
    this.products = this.products.filter(({ id }) => id != pid);
    this.closeModal();
  }
  async toContentPage(pid?: string) {
    this.router.navigateByUrl('content');
  }
}
