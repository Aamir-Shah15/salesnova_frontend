import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Checkout = () => {
  const { items, subtotal, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Nothing to checkout</h1>
        <Link to="/products" className="btn-primary-cta mt-4 inline-block">Shop Now</Link>
      </div>
    );
  }

  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed successfully! 🎉");
    clearCart();
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">
        {/* Shipping form */}
        <div className="flex-1 space-y-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-bold text-foreground mb-4">Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", name: "name", type: "text", full: true },
                { label: "Email", name: "email", type: "email" },
                { label: "Phone", name: "phone", type: "tel" },
                { label: "Address", name: "address", type: "text", full: true },
                { label: "City", name: "city", type: "text" },
                { label: "State", name: "state", type: "text" },
                { label: "ZIP Code", name: "zip", type: "text" },
                { label: "Country", name: "country", type: "text" },
              ].map((f) => (
                <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
                  <label className="text-sm font-medium text-foreground mb-1 block">{f.label}</label>
                  <input
                    type={f.type}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-bold text-foreground mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:border-primary transition">
                <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="accent-primary" />
                <div>
                  <span className="text-sm font-medium text-foreground">Cash on Delivery</span>
                  <p className="text-xs text-muted-foreground">Pay when your order arrives</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:border-primary transition">
                <input type="radio" name="payment" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} className="accent-primary" />
                <div>
                  <span className="text-sm font-medium text-foreground">Online Payment</span>
                  <p className="text-xs text-muted-foreground">Credit/Debit Card, UPI, Net Banking</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-card rounded-xl border border-border p-6 sticky top-28">
            <h2 className="font-bold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3 text-sm">
                  <img src={product.image} alt="" className="w-10 h-10 rounded object-cover bg-secondary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                  </div>
                  <span className="font-medium text-foreground">${(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-foreground">
                <span>Subtotal ({totalItems})</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Shipping</span><span className={shipping === 0 ? "text-success font-medium" : ""}>{shipping === 0 ? "Free" : `$${shipping}`}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between text-foreground font-bold text-lg">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button type="submit" className="btn-primary-cta w-full mt-6">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
