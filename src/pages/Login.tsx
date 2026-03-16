import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { registerUser, loginUser } from "@/lib/api";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
        toast.success("Account created! Please sign in.");
        setIsSignUp(false);
        setFormData({ username: "", email: "", password: "", role: "CUSTOMER" });
      } else {
        const res = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        toast.success(`Welcome, ${res.username}!`);
        if (res.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err: any) {
      toast.error(err?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-border shadow-lg p-8">
          <div className="text-center mb-8">
            <Link to="/" className="text-2xl font-extrabold text-foreground">
              Sales<span className="text-primary">Nova</span>
            </Link>
            <h1 className="text-xl font-bold text-foreground mt-4">
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isSignUp ? "Join SalesNova for exclusive deals" : "Sign in to your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Role selector — only on signup */}
            {isSignUp && (
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  I am a...
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "CUSTOMER" })}
                    className={`py-2.5 rounded-lg border text-sm font-medium transition ${
                      formData.role === "CUSTOMER"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary"
                    }`}
                  >
                    🛒 Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "ADMIN" })}
                    className={`py-2.5 rounded-lg border text-sm font-medium transition ${
                      formData.role === "ADMIN"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary"
                    }`}
                  >
                    ⚙️ Admin
                  </button>
                </div>
              </div>
            )}

            {/* Username — only on signup */}
            {isSignUp && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition"
                  placeholder="john_doe"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="text-right">
                <button type="button" className="text-xs text-primary hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary-cta w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? isSignUp ? "Creating..." : "Signing in..."
                : isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setFormData({ username: "", email: "", password: "", role: "CUSTOMER" });
              }}
              className="text-primary font-medium hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;