export interface IPrimeMessage {
  severity?: string;
  summary?: string;
  detail?: string;
  closable?: boolean;
  sticky?: boolean;
  life?: number;
}