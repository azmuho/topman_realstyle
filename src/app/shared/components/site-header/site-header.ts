import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PromotionService } from '../../../core/services/promotion.service';
import { SocialLinks } from '../social-links/social-links';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SocialLinks],
  selector: 'app-site-header',
  styleUrl: './site-header.scss',
  templateUrl: './site-header.html',
})
export class SiteHeader {
  private readonly promotionService = inject(PromotionService);

  protected readonly menuOpen = signal(false);
  protected readonly promotionDismissed = signal(
    typeof sessionStorage !== 'undefined' &&
      sessionStorage.getItem('topman-promotion-dismissed') === 'true',
  );
  protected readonly activePromotion = this.promotionService.activePromotion;

  protected toggleMenu(): void {
    this.menuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected dismissPromotion(): void {
    this.promotionDismissed.set(true);
    sessionStorage.setItem('topman-promotion-dismissed', 'true');
  }
}
