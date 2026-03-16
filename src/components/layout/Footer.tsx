import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => (
  <footer className="bg-nav text-nav-foreground mt-16">
    <div className="container mx-auto px-4 py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-extrabold mb-4">Sales<span className="text-primary">Nova</span></h3>
          <p className="text-sm text-nav-foreground/70 leading-relaxed mb-6">
            Your trusted destination for premium products at unbeatable prices. We're committed to quality, value, and an exceptional shopping experience.
          </p>
          <div className="space-y-2 text-sm text-nav-foreground/60">
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> 123 Commerce St, New York, NY</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +1 (800) 555-0199</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> support@salesnova.com</div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-5 text-nav-foreground">Quick Links</h4>
          <ul className="space-y-3 text-sm text-nav-foreground/70">
            <li><Link to="/products" className="hover:text-primary transition">All Products</Link></li>
            <li><Link to="/products?category=electronics" className="hover:text-primary transition">Electronics</Link></li>
            <li><Link to="/products?category=fashion" className="hover:text-primary transition">Fashion</Link></li>
            <li><Link to="/cart" className="hover:text-primary transition">My Cart</Link></li>
            <li><Link to="/login" className="hover:text-primary transition">My Account</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-semibold mb-5 text-nav-foreground">Customer Service</h4>
          <ul className="space-y-3 text-sm text-nav-foreground/70">
            <li><span className="hover:text-primary transition cursor-pointer">Help Center</span></li>
            <li><span className="hover:text-primary transition cursor-pointer">Returns & Refunds</span></li>
            <li><span className="hover:text-primary transition cursor-pointer">Shipping Information</span></li>
            <li><span className="hover:text-primary transition cursor-pointer">Privacy Policy</span></li>
            <li><span className="hover:text-primary transition cursor-pointer">Terms of Service</span></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-5 text-nav-foreground">Stay in the Loop</h4>
          <p className="text-sm text-nav-foreground/70 mb-4">
            Subscribe to get exclusive deals, early access to sales, and personalized recommendations.
          </p>
          <div className="flex">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2.5 rounded-l-lg text-foreground bg-card text-sm border-0 outline-none" />
            <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-r-lg text-sm font-semibold hover:brightness-110 transition">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-nav-foreground/40 mt-2">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </div>

      <div className="border-t border-nav-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-nav-foreground/50">
        <p>© 2026 SalesNova. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="hover:text-primary transition cursor-pointer">Privacy</span>
          <span className="hover:text-primary transition cursor-pointer">Terms</span>
          <span className="hover:text-primary transition cursor-pointer">Cookies</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
