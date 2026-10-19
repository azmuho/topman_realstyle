export interface Promotion {
  id: string;
  enabled: boolean;
  label: string;
  title: string;
  description: string;
  terms: string;
  startDate?: string;
  endDate?: string;
  ctaLabel: string;
  ctaRoute: string;
  ctaFragment?: string;
}
