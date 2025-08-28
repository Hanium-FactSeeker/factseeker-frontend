export interface ApiWrap<T = unknown> {
  success?: boolean;
  message?: string;
  data?: T;
}
