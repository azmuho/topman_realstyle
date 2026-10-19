import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CatalogueService } from '../../../core/services/catalogue.service';
import { ProductCard } from '../../../shared/components/product-card/product-card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductCard, RouterLink],
  selector: 'app-category-page',
  styleUrl: './category-page.scss',
  templateUrl: './category-page.html',
})
export class CategoryPage {
  private readonly catalogue = inject(CatalogueService);
  private readonly route = inject(ActivatedRoute);
  private readonly injector = inject(Injector);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  protected readonly pageSize = 10;
  protected readonly currentPage = signal(1);
  protected readonly selectedFilters = signal<Record<string, string[]>>({});
  protected readonly slug = toSignal(
    this.route.paramMap.pipe(map((parameters) => parameters.get('slug') ?? '')),
    { initialValue: '', injector: this.injector },
  );
  protected readonly category = computed(() =>
    this.catalogue.categories().find((category) => category.slug === this.slug()),
  );
  protected readonly products = toSignal(
    this.route.paramMap.pipe(
      map((parameters) => parameters.get('slug') ?? ''),
      switchMap((slug) => this.catalogue.getProducts(slug)),
    ),
    { initialValue: [], injector: this.injector },
  );
  protected readonly filterGroups = computed(() => this.category()?.filters ?? []);
  protected readonly filteredProducts = computed(() => {
    const selectedFilters = this.selectedFilters();
    return this.products().filter((product) =>
      Object.entries(selectedFilters).every(
        ([key, selectedOptions]) =>
          selectedOptions.length === 0 || selectedOptions.includes(product.attributes[key]),
      ),
    );
  });
  protected readonly hasActiveFilters = computed(() =>
    Object.values(this.selectedFilters()).some((options) => options.length > 0),
  );
  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredProducts().length / this.pageSize)),
  );
  protected readonly visibleProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });
  protected readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index + 1),
  );

  constructor() {
    effect(() => {
      this.slug();
      this.currentPage.set(1);
      this.selectedFilters.set({});
    });

    effect(() => {
      const category = this.category();
      if (!category) return;
      this.title.setTitle(`${category.name} | Topman Realstyle`);
      this.meta.updateTag({ name: 'description', content: category.description });
    });
  }

  protected goToPage(page: number): void {
    const targetPage = Math.min(Math.max(page, 1), this.totalPages());
    this.currentPage.set(targetPage);
    document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected isFilterSelected(key: string, option: string): boolean {
    return this.selectedFilters()[key]?.includes(option) ?? false;
  }

  protected toggleFilter(key: string, option: string): void {
    this.selectedFilters.update((filters) => {
      const selectedOptions = filters[key] ?? [];
      const nextOptions = selectedOptions.includes(option) ? [] : [option];
      return { ...filters, [key]: nextOptions };
    });
    this.currentPage.set(1);
  }

  protected clearFilterGroup(key: string): void {
    this.selectedFilters.update((filters) => ({ ...filters, [key]: [] }));
    this.currentPage.set(1);
  }

  protected clearAllFilters(): void {
    this.selectedFilters.set({});
    this.currentPage.set(1);
  }
}
