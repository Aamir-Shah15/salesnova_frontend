import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Heart, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top bar */}
      <div className="nav-top">
        <div className="container mx-auto px-4 flex items-center h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-nav-foreground">
              Sales<span className="text-primary">Nova</span>
            </span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l-lg text-foreground bg-card border-0 outline-none text-sm"
              />
              <button type="submit" className="px-5 py-2 bg-primary text-primary-foreground rounded-r-lg hover:brightness-110 transition">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-1 md:gap-3 ml-auto">
            <Link to="/login" className="hidden md:flex flex-col items-center text-nav-foreground hover:text-primary transition text-xs gap-0.5 px-2">
              <User className="w-5 h-5" />
              <span>Account</span>
            </Link>
            <Link to="/wishlist" className="hidden md:flex flex-col items-center text-nav-foreground hover:text-primary transition text-xs gap-0.5 px-2">
              <Heart className="w-5 h-5" />
              <span>Wishlist</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center text-nav-foreground hover:text-primary transition text-xs gap-0.5 px-2 relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-0 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="hidden md:block">Cart</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-nav-foreground p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Category bar */}
      <div className="bg-card border-b border-border hidden md:block">
        <div className="container mx-auto px-4 flex items-center h-10 gap-6 text-sm">
          <div className="relative">
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="flex items-center gap-1 font-semibold text-foreground hover:text-primary transition"
            >
              <Menu className="w-4 h-4" /> All Categories <ChevronDown className="w-3 h-3" />
            </button>
            {categoryOpen && (
              <div className="absolute top-full left-0 mt-1 bg-card rounded-lg shadow-xl border border-border py-2 w-56 z-50 animate-fade-in">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.slug}`}
                    onClick={() => setCategoryOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition text-sm text-foreground"
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span>{cat.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">({cat.count})</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {["Electronics", "Fashion", "Home & Kitchen", "Sports", "Books", "Beauty"].map((c) => (
            <Link
              key={c}
              to={`/products?category=${c.toLowerCase().replace(/ & /g, "-")}`}
              className="text-muted-foreground hover:text-primary transition whitespace-nowrap"
            >
              {c}
            </Link>
          ))}
          <Link to="/products" className="text-primary font-medium ml-auto hover:underline">
            View All
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border animate-fade-in">
          <form onSubmit={handleSearch} className="p-4">
            <div className="flex">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l-lg border border-border bg-secondary text-foreground text-sm"
              />
              <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-r-lg">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
          <div className="px-4 pb-4 space-y-1">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2.5 text-foreground hover:text-primary transition">
              <User className="w-5 h-5" /> Account
            </Link>
            <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2.5 text-foreground hover:text-primary transition">
              <Heart className="w-5 h-5" /> Wishlist
            </Link>
            <div className="border-t border-border pt-2 mt-2">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Categories</p>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-sm text-foreground hover:text-primary transition"
                >
                  <span>{cat.icon}</span> {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
