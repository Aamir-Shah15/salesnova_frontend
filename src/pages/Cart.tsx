import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">Add some products to get started.</p>
        <Link to="/products" className="btn-primary-cta mt-6 inline-block">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Shopping Cart ({totalItems} items)</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items */}
        <div className="flex-1 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-card rounded-xl border border-border p-4 flex gap-4">
              <Link to={`/product/${product.slug}`} className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-secondary">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${product.slug}`} className="font-medium text-foreground hover:text-primary transition line-clamp-2 text-sm md:text-base">
                  {product.name}
                </Link>
                <p className="text-xs text-muted-foreground mt-1">{product.brand}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-foreground">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 hover:bg-secondary transition"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="px-3 text-sm font-medium text-foreground">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 hover:bg-secondary transition"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                  <button onClick={() => removeFromCart(product.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-card rounded-xl border border-border p-6 sticky top-28">
            <h2 className="font-bold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-foreground">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Shipping</span>
                <span className="font-medium text-success">{subtotal >= 50 ? "Free" : "$5.99"}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-foreground">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg">${(subtotal + (subtotal >= 50 ? 0 : 5.99)).toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout" className="btn-primary-cta w-full mt-6 block text-center">
              Proceed to Checkout
            </Link>
            <Link to="/products" className="block text-center text-sm text-primary hover:underline mt-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
