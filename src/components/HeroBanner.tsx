import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from "lucide-react";
import heroBannerImg from "@/assets/hero-banner.jpg";

const HeroBanner = () => (
  <section>
    {/* Main Hero */}
    <div className="relative overflow-hidden bg-nav text-nav-foreground">
      {/* Background image */}
      <img
        src={heroBannerImg}
        alt="Premium electronics collection"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-nav via-nav/85 to-transparent" />

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-28 relative z-10">
        <div className="max-w-2xl space-y-6 animate-fade-up">
          <span className="inline-block badge-sale text-sm px-4 py-1.5 rounded-full">
            🔥 Mega Sale — Up to 50% Off
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
            Shop Smarter.<br />
            Live <span className="text-primary">Better.</span>
          </h1>
          <p className="text-nav-foreground/75 text-base md:text-lg max-w-lg leading-relaxed">
            Discover curated collections from world-class brands. Enjoy free shipping, hassle-free returns, and unbeatable prices — all in one place.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/products" className="btn-primary-cta flex items-center gap-2 text-base">
              Start Shopping <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/products?category=electronics" className="btn-secondary-cta text-base">
              Explore Deals
            </Link>
          </div>

          {/* Quick stats */}
          <div className="flex gap-8 pt-6 text-sm">
            {[
              { value: "50K+", label: "Happy Customers" },
              { value: "10K+", label: "Products" },
              { value: "4.8★", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-xl font-bold text-primary">{stat.value}</p>
                <p className="text-nav-foreground/60 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Trust bar */}
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Truck, label: "Free Delivery", desc: "On orders over $50" },
          { icon: RotateCcw, label: "Easy Returns", desc: "30-day hassle-free returns" },
          { icon: Shield, label: "Secure Checkout", desc: "256-bit SSL encryption" },
          { icon: Headphones, label: "24/7 Support", desc: "Expert help anytime" },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeroBanner;
