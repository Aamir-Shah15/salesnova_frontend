import { Settings } from "lucide-react";

const AdminSettings = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="text-sm text-muted-foreground mt-1">Manage your store settings.</p>
    </div>

    <div className="bg-card rounded-xl border border-border p-8 text-center">
      <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-lg font-semibold text-foreground">Store Settings</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
        Settings panel is coming soon. You'll be able to configure store name, payment methods, shipping rates, and more.
      </p>
    </div>
  </div>
);

export default AdminSettings;
