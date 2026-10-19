import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SocialLinks } from '../social-links/social-links';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SocialLinks],
  selector: 'app-site-footer',
  styleUrl: './site-footer.scss',
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  protected readonly currentYear = new Date().getFullYear();
}
