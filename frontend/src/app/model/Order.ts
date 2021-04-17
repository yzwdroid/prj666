export class Order {
  order_id: any;
  transaction_id: number;
  order_status: string;
  order_date: Date | string;
  order_total_plus_tax: DoubleRange;
}
