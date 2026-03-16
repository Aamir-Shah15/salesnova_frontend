import { useState } from "react";
import { products } from "@/data/products";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminProducts = () => {
  const [search, setSearch] = useState("");
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">{products.length} total products</p>
        </div>
        <button
          onClick={() => toast.info("Add product form coming soon!")}
          className="btn-primary-cta flex items-center gap-2 text-sm self-start"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2 max-w-md">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm text-foreground outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-5 py-3 font-medium">Product</th>
              <th className="text-left px-5 py-3 font-medium">Category</th>
              <th className="text-left px-5 py-3 font-medium">Price</th>
              <th className="text-left px-5 py-3 font-medium">Rating</th>
              <th className="text-left px-5 py-3 font-medium">Stock</th>
              <th className="text-right px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-secondary" />
                    <div>
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-foreground">{p.category}</td>
                <td className="px-5 py-3">
                  <span className="font-medium text-foreground">${p.price}</span>
                  {p.originalPrice > p.price && (
                    <span className="text-xs text-muted-foreground line-through ml-1">${p.originalPrice}</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <span className="text-foreground">{p.rating}★</span>
                  <span className="text-xs text-muted-foreground ml-1">({p.reviews})</span>
                </td>
                <td className="px-5 py-3">
                  {p.inStock ? (
                    <span className="text-xs font-semibold text-success bg-success/15 px-2 py-0.5 rounded-full">In Stock</span>
                  ) : (
                    <span className="text-xs font-semibold text-destructive bg-destructive/15 px-2 py-0.5 rounded-full">Out</span>
                  )}
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => toast.info("Edit product coming soon!")}
                      className="p-2 hover:bg-secondary rounded-lg transition text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toast.info("Delete product coming soon!")}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
