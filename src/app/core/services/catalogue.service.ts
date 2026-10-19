import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, catchError, of, shareReplay } from 'rxjs';
import { Category, Product, StoreLocation } from '../models/catalogue.models';

@Injectable({ providedIn: 'root' })
export class CatalogueService {
  private readonly http = inject(HttpClient);
  private readonly injector = inject(Injector);
  private readonly productCollections = new Map<string, Observable<Product[]>>();

  readonly categories = toSignal(this.http.get<Category[]>('data/categories.json'), {
    injector: this.injector,
    initialValue: [],
  });

  readonly locations = toSignal(this.http.get<StoreLocation[]>('data/locations.json'), {
    injector: this.injector,
    initialValue: [],
  });

  getProducts(categorySlug: string): Observable<Product[]> {
    if (!/^[a-z0-9-]+$/.test(categorySlug)) return of([]);

    const cachedCollection = this.productCollections.get(categorySlug);
    if (cachedCollection) return cachedCollection;

    const collection = this.http.get<Product[]>(`data/products/${categorySlug}.json`).pipe(
      catchError(() => of([])),
      shareReplay({ bufferSize: 1, refCount: false }),
    );
    this.productCollections.set(categorySlug, collection);
    return collection;
  }
}
