export interface DashboardData {
  total_sales: number;
  total_orders: number;
  total_users: number;
  total_products: number;
  conversion_rate: number;
  average_order_value: number;
  top_products: {
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }[];
  sales_trend: {
    date: string;
    sales: number;
    orders: number;
  }[];
  order_status_distribution: { [key: string]: number };
  user_growth: {
    date: string;
    new_users: number;
  }[];
}
