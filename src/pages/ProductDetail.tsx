import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Zap, Truck, Shield, ChevronRight, Minus, Plus } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
        <Link to="/products" className="btn-primary-cta mt-4 inline-block">Browse Products</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary transition">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/products" className="hover:text-primary transition">Products</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-secondary rounded-xl overflow-hidden border border-border">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${i === selectedImage ? "border-primary" : "border-border hover:border-primary/50"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-1">{product.name}</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-success text-success-foreground text-sm font-bold px-2 py-1 rounded">
              {product.rating} <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-sm text-muted-foreground">{product.reviews.toLocaleString()} ratings</span>
          </div>

          <div className="border-t border-b border-border py-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">${product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  <span className="text-sm font-bold text-success">{product.discount}% off</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>
          </div>

          <p className="text-sm text-foreground/80 leading-relaxed">{product.description}</p>

          {product.inStock ? (
            <p className="text-sm font-semibold text-success">✓ In Stock</p>
          ) : (
            <p className="text-sm font-semibold text-destructive">✗ Out of Stock</p>
          )}

          {/* Qty + Buttons */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-border rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-secondary transition"><Minus className="w-4 h-4" /></button>
              <span className="px-4 py-2 text-sm font-medium text-foreground">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-secondary transition"><Plus className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => product.inStock && addToCart(product, qty)}
              disabled={!product.inStock}
              className="btn-primary-cta flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button
              disabled={!product.inStock}
              className="flex-1 bg-warning text-warning-foreground font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Zap className="w-5 h-5" /> Buy Now
            </button>
          </div>

          {/* Delivery info */}
          <div className="bg-secondary rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="w-5 h-5 text-primary shrink-0" />
              <span className="text-foreground">Free delivery on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-5 h-5 text-primary shrink-0" />
              <span className="text-foreground">1-year warranty included</span>
            </div>
          </div>

          {/* Specs */}
          {Object.keys(product.specs).length > 0 && (
            <div>
              <h3 className="font-bold text-foreground mb-3">Specifications</h3>
              <div className="border border-border rounded-xl overflow-hidden">
                {Object.entries(product.specs).map(([key, val], i) => (
                  <div key={key} className={`flex text-sm ${i > 0 ? "border-t border-border" : ""}`}>
                    <span className="w-40 shrink-0 px-4 py-2.5 bg-secondary font-medium text-foreground">{key}</span>
                    <span className="px-4 py-2.5 text-foreground/80">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="section-title mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
