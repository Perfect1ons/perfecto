export type Notifications = Notification[];

export interface Notification {
  id: number;
  date?: number;
  text: string;
  object_id: string;
  user_id: number;
  cart_id: any;
  status: number;
}
