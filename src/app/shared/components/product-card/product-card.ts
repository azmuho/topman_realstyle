import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Product } from '../../../core/models/catalogue.models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-product-card',
  styleUrl: './product-card.scss',
  templateUrl: './product-card.html',
})
export class ProductCard {
  readonly product = input.required<Product>();

  protected readonly selectedVariantIndex = signal(0);
  protected readonly selectedVariant = computed(
    () => this.product().variants[this.selectedVariantIndex()] ?? this.product().variants[0],
  );

  protected selectVariant(index: number): void {
    this.selectedVariantIndex.set(index);
  }

  protected formatPrice(price: number | undefined): string {
    return price === undefined ? 'Price on request' : `Rs ${price.toLocaleString('en-MU')}`;
  }
}
