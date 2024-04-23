export type IDiscounts = IDiscountsResponse;

export interface IDiscountsResponse {
  promotion_id: number;
  name: string;
  short_description: string;
  description: string;
  conditions: string;
  bonuses: Bonuses;
  to_date: number;
  from_date: number;
  priority: number;
  stop: string;
  zone: string;
  conditions_hash: any;
  status: string;
  number_of_usages: number;
  users_conditions_hash: any;
  image: string;
  banner: any;
  banner_cat: string;
  timer: number;
  timer_continue: number;
  days: number;
  hours: number;
  word_day: string;
  word: string;
  message: string;
}

export interface Bonuses {
  "1": N1;
}

export interface N1 {
  bonus: string;
  type: string;
  discount_value: string;
  discount_bonuse: string;
}
