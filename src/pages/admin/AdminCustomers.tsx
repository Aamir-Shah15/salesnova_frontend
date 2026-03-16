import { Users, Mail } from "lucide-react";
import { mockOrders } from "@/data/orders";

const AdminCustomers = () => {
  // Derive unique customers from orders
  const customers = Array.from(
    new Map(mockOrders.map((o) => [o.email, { name: o.customer, email: o.email, orders: 0, spent: 0 }])).values()
  ).map((c) => {
    const customerOrders = mockOrders.filter((o) => o.email === c.email);
    return { ...c, orders: customerOrders.length, spent: customerOrders.reduce((s, o) => s + o.total, 0) };
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Customers</h1>
        <p className="text-sm text-muted-foreground mt-1">{customers.length} registered customers</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((c) => (
          <div key={c.email} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {c.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> {c.email}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm border-t border-border pt-3">
              <div>
                <p className="text-muted-foreground">Orders</p>
                <p className="font-bold text-foreground">{c.orders}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Total Spent</p>
                <p className="font-bold text-foreground">${c.spent.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCustomers;
