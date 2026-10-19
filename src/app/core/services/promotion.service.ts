import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Promotion } from '../models/promotion.model';

@Injectable({ providedIn: 'root' })
export class PromotionService {
  private readonly http = inject(HttpClient);
  private readonly injector = inject(Injector);

  private readonly promotions = toSignal(this.http.get<Promotion[]>('data/promotions.json'), {
    injector: this.injector,
    initialValue: [],
  });

  readonly activePromotion = computed(() => {
    const today = this.localDate(new Date());

    return (
      this.promotions().find(
        (promotion) =>
          promotion.enabled &&
          (!promotion.startDate || promotion.startDate <= today) &&
          (!promotion.endDate || promotion.endDate >= today),
      ) ?? null
    );
  });

  private localDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
