import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-social-links',
  styleUrl: './social-links.scss',
  templateUrl: './social-links.html',
})
export class SocialLinks {}
