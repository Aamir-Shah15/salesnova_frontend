import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { products } from "@/data/products";
import { mockOrders } from "@/data/orders";

const stats = [
  {
    label: "Total Revenue",
    value: "$12,482",
    change: "+12.5%",
    up: true,
    icon: DollarSign,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Orders",
    value: mockOrders.length.toString(),
    change: "+8.2%",
    up: true,
    icon: ShoppingCart,
    color: "bg-success/10 text-success",
  },
  {
    label: "Products",
    value: products.length.toString(),
    change: "+3",
    up: true,
    icon: Package,
    color: "bg-warning/10 text-warning",
  },
  {
    label: "Customers",
    value: "1,248",
    change: "-2.1%",
    up: false,
    icon: Users,
    color: "bg-destructive/10 text-destructive",
  },
];

const AdminDashboard = () => {
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back! Here's your store overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? "text-success" : "text-destructive"}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mt-3">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="font-bold text-foreground">Recent Orders</h2>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left px-5 py-3 font-medium">Order</th>
                  <th className="text-left px-5 py-3 font-medium">Customer</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                  <th className="text-right px-5 py-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition">
                    <td className="px-5 py-3 font-medium text-foreground">{order.id}</td>
                    <td className="px-5 py-3 text-foreground">{order.customer}</td>
                    <td className="px-5 py-3">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-foreground">${order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-5 border-b border-border">
            <h2 className="font-bold text-foreground">Top Products</h2>
          </div>
          <div className="p-3">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition">
                <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.reviews.toLocaleString()} sold</p>
                </div>
                <span className="text-sm font-bold text-foreground">${p.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export function OrderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-warning/15 text-warning",
    processing: "bg-primary/15 text-primary",
    shipped: "bg-[hsl(200,80%,50%)]/15 text-[hsl(200,80%,40%)]",
    delivered: "bg-success/15 text-success",
    cancelled: "bg-destructive/15 text-destructive",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${styles[status] || ""}`}>
      {status}
    </span>
  );
}

export default AdminDashboard;
