import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PageLoader from "@/components/PageLoader";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import AdminLogin from "@/pages/admin/AdminLogin";

function AdminGate({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!isAdmin) return <AdminLogin />;
  return <>{children}</>;
}

const AdminLayout = lazy(() => import("@/pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminOrders = lazy(() => import("@/pages/admin/AdminOrders"));
const AdminInventory = lazy(() => import("@/pages/admin/AdminInventory"));
const AdminLeads = lazy(() => import("@/pages/admin/AdminLeads"));
const AdminService = lazy(() => import("@/pages/admin/AdminService"));
const AdminLeaveRequests = lazy(() => import("@/pages/admin/AdminLeaveRequests"));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminRoles = lazy(() => import("@/pages/admin/AdminRoles"));
const AdminActivityLogs = lazy(() => import("@/pages/admin/AdminActivityLogs"));
const AdminBackups = lazy(() => import("@/pages/admin/AdminBackups"));

export default function AdminRoutes() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<AdminGate><AdminLayout /></AdminGate>}>
            <Route index element={<AdminDashboard />} />
            <Route path="siparisler" element={<AdminOrders />} />
            <Route path="stok" element={<AdminInventory />} />
            <Route path="talepler" element={<AdminLeads />} />
            <Route path="servis" element={<AdminService />} />
            <Route path="izinler" element={<AdminLeaveRequests />} />
            <Route path="kullanicilar" element={<AdminUsers />} />
            <Route path="roller" element={<AdminRoles />} />
            <Route path="aktivite-loglari" element={<AdminActivityLogs />} />
            <Route path="yedekler" element={<AdminBackups />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}