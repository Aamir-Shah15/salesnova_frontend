import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card group">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="product-card-image aspect-square relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
          {product.badge && (
            <span className={`absolute top-2 left-2 ${product.badge === "sale" ? "badge-sale" : product.badge === "new" ? "badge-new" : "bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded"}`}>
              {product.badge === "sale" ? `-${product.discount}%` : product.badge === "new" ? "NEW" : "BESTSELLER"}
            </span>
          )}
        </div>
      </Link>
      <div className="p-3 md:p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex items-center gap-0.5 bg-success text-success-foreground text-xs font-bold px-1.5 py-0.5 rounded">
            {product.rating} <Star className="w-3 h-3 fill-current" />
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-foreground">${product.price}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              <span className="text-xs font-semibold text-success">{product.discount}% off</span>
            </>
          )}
        </div>
        {!product.inStock && (
          <p className="text-xs text-destructive font-medium mt-1">Out of Stock</p>
        )}
        <button
          onClick={() => product.inStock && addToCart(product)}
          disabled={!product.inStock}
          className="mt-3 w-full flex items-center justify-center gap-2 btn-primary-cta text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
