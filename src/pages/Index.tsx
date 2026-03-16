import { Link } from "react-router-dom";
import { ArrowRight, Zap, TrendingUp, Flame } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import promoBannerImg from "@/assets/promo-banner.jpg";

const Index = () => {
  const featured = products.filter((p) => p.badge === "bestseller" || p.rating >= 4.6).slice(0, 4);
  const trending = products.filter((p) => p.badge === "new").slice(0, 4);
  const deals = products.filter((p) => p.discount >= 30).slice(0, 4);

  return (
    <div>
      <HeroBanner />

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="section-title">Shop by Category</h2>
          <span className="text-sm text-muted-foreground hidden sm:inline">— Find exactly what you need</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="flex flex-col items-center gap-3 p-5 bg-card rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300 group"
            >
              <span className="text-3xl group-hover:scale-125 transition-transform duration-300">{cat.icon}</span>
              <span className="text-xs font-semibold text-foreground text-center">{cat.name}</span>
              <span className="text-[10px] text-muted-foreground">{cat.count} items</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="section-title">Featured Products</h2>
          </div>
          <Link to="/products" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Promo banner */}
      <section className="container mx-auto px-4 py-8">
        <div className="relative rounded-2xl overflow-hidden group">
          <img
            src={promoBannerImg}
            alt="Summer sale promotion"
            className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
            <div>
              <h3 className="text-2xl md:text-4xl font-extrabold text-primary-foreground leading-tight">
                Summer Sale is Live!
              </h3>
              <p className="text-primary-foreground/85 mt-2 text-sm md:text-base max-w-md">
                Save up to 50% on electronics, fashion, home essentials, and more. Limited time — don't miss out.
              </p>
            </div>
            <Link
              to="/products"
              className="mt-4 md:mt-0 bg-card text-foreground font-bold px-8 py-3 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 shrink-0"
            >
              Shop the Sale
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="section-title">New Arrivals</h2>
          </div>
          <Link to="/products" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Best Deals */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            <h2 className="section-title">Best Deals</h2>
          </div>
          <Link to="/products" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {deals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-3">Why Customers Love SalesNova</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-md mx-auto">
            Join thousands of satisfied shoppers who trust us for quality, value, and service.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Unbeatable Prices", desc: "We negotiate directly with brands so you always get the lowest price — guaranteed.", emoji: "💰" },
              { title: "Fast & Free Shipping", desc: "Orders over $50 ship free with express delivery. Track every step of the way.", emoji: "🚀" },
              { title: "Trusted by Thousands", desc: "Over 50,000 five-star reviews. Our customers love us and keep coming back.", emoji: "⭐" },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-2xl p-8 text-center border border-border hover:shadow-lg transition-shadow duration-300">
                <span className="text-4xl mb-4 block">{item.emoji}</span>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
