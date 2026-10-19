import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogueService } from '../../../core/services/catalogue.service';
import { PromotionService } from '../../../core/services/promotion.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-home-page',
  styleUrl: './home-page.scss',
  templateUrl: './home-page.html',
})
export class HomePage {
  private readonly catalogue = inject(CatalogueService);
  private readonly promotionService = inject(PromotionService);

  protected readonly categories = this.catalogue.categories;
  protected readonly locations = this.catalogue.locations;
  protected readonly activePromotion = this.promotionService.activePromotion;
}
