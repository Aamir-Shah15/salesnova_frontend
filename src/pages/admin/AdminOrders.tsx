import { useState } from "react";
import { mockOrders } from "@/data/orders";
import { OrderStatusBadge } from "./AdminDashboard";
import { Search, Eye } from "lucide-react";

const AdminOrders = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = mockOrders.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">{mockOrders.length} total orders</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-5 py-3 font-medium">Order ID</th>
              <th className="text-left px-5 py-3 font-medium">Customer</th>
              <th className="text-left px-5 py-3 font-medium">Date</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">Payment</th>
              <th className="text-right px-5 py-3 font-medium">Total</th>
              <th className="text-right px-5 py-3 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <>
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition">
                  <td className="px-5 py-3 font-medium text-foreground">{order.id}</td>
                  <td className="px-5 py-3">
                    <p className="text-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </td>
                  <td className="px-5 py-3 text-foreground">{order.date}</td>
                  <td className="px-5 py-3"><OrderStatusBadge status={order.status} /></td>
                  <td className="px-5 py-3 text-foreground capitalize">{order.payment === "cod" ? "Cash on Delivery" : "Online"}</td>
                  <td className="px-5 py-3 text-right font-medium text-foreground">${order.total.toFixed(2)}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      className="p-2 hover:bg-secondary rounded-lg transition text-muted-foreground hover:text-foreground"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr key={`${order.id}-detail`} className="border-b border-border bg-secondary/30">
                    <td colSpan={7} className="px-5 py-4">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-2">Items</p>
                          {order.items.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-3 mb-2">
                              <img src={item.product.image} alt="" className="w-8 h-8 rounded object-cover bg-secondary" />
                              <span className="text-sm text-foreground">{item.product.name} × {item.quantity}</span>
                              <span className="text-sm font-medium text-foreground ml-auto">${(item.product.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-2">Shipping Address</p>
                          <p className="text-sm text-foreground">{order.address}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No orders found.</div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
