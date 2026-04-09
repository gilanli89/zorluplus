import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Check, X, Shield, ShieldAlert, ShieldCheck, User } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ROLES = ["super_admin", "admin", "moderator", "user"] as const;

const ROLE_INFO: Record<string, { label: string; description: string; icon: React.ElementType; color: string }> = {
  super_admin: { label: "Süper Admin", description: "Tüm yetkilere sahip, rol yönetimi yapabilir", icon: ShieldAlert, color: "text-red-500" },
  admin: { label: "Admin", description: "Sipariş, stok, servis ve kullanıcı yönetimi", icon: ShieldCheck, color: "text-orange-500" },
  moderator: { label: "Moderatör", description: "Sipariş, stok ve servis görüntüleme/düzenleme", icon: Shield, color: "text-blue-500" },
  user: { label: "Kullanıcı", description: "Standart kullanıcı, yönetim paneline erişim yok", icon: User, color: "text-muted-foreground" },
};

const PERMISSIONS = [
  { key: "dashboard", label: "Özet Paneli" },
  { key: "orders_view", label: "Siparişleri Görüntüle" },
  { key: "orders_manage", label: "Siparişleri Yönet" },
  { key: "inventory_view", label: "Stok Görüntüle" },
  { key: "inventory_manage", label: "Stok Yönet" },
  { key: "service_view", label: "Servis Taleplerini Görüntüle" },
  { key: "service_manage", label: "Servis Taleplerini Yönet" },
  { key: "leads_view", label: "Müşteri Taleplerini Görüntüle" },
  { key: "leads_manage", label: "Müşteri Taleplerini Yönet" },
  { key: "users_view", label: "Kullanıcıları Görüntüle" },
  { key: "users_manage", label: "Kullanıcıları Yönet" },
  { key: "roles_manage", label: "Rol Yönetimi" },
  { key: "leave_manage", label: "İzin Talepleri Yönetimi" },
];

const PERMISSION_MATRIX: Record<string, Record<string, boolean>> = {
  super_admin: {
    dashboard: true, orders_view: true, orders_manage: true,
    inventory_view: true, inventory_manage: true,
    service_view: true, service_manage: true,
    leads_view: true, leads_manage: true,
    users_view: true, users_manage: true,
    roles_manage: true, leave_manage: true,
  },
  admin: {
    dashboard: true, orders_view: true, orders_manage: true,
    inventory_view: true, inventory_manage: true,
    service_view: true, service_manage: true,
    leads_view: true, leads_manage: true,
    users_view: true, users_manage: false,
    roles_manage: false, leave_manage: true,
  },
  moderator: {
    dashboard: true, orders_view: true, orders_manage: true,
    inventory_view: true, inventory_manage: true,
    service_view: true, service_manage: true,
    leads_view: true, leads_manage: false,
    users_view: false, users_manage: false,
    roles_manage: false, leave_manage: false,
  },
  user: {
    dashboard: false, orders_view: false, orders_manage: false,
    inventory_view: false, inventory_manage: false,
    service_view: false, service_manage: false,
    leads_view: false, leads_manage: false,
    users_view: false, users_manage: false,
    roles_manage: false, leave_manage: false,
  },
};

type AdminUser = {
  id: string;
  email: string;
  role: string;
  created_at: string;
};

async function callAdminUsers(method: string, body?: object) {
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-users`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
      body: body ? JSON.stringify(body) : undefined,
    }
  );
  return res.json();
}

export default function AdminRoles() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await callAdminUsers("GET");
    setUsers(data.users || []);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const roleCounts = ROLES.reduce((acc, role) => {
    acc[role] = users.filter(u => u.role === role).length;
    return acc;
  }, {} as Record<string, number>);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdating(userId);
    try {
      const res = await callAdminUsers("PATCH", { user_id: userId, action: "role", role: newRole });
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Rol güncellendi");
        fetchUsers();
      }
    } catch {
      toast.error("Rol güncellenirken hata oluştu");
    }
    setUpdating(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Rol Yönetimi</h1>
        <p className="text-muted-foreground mt-1">Roller arası yetki farklarını görüntüleyin ve kullanıcı rollerini yönetin.</p>
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ROLES.map(role => {
          const info = ROLE_INFO[role];
          const Icon = info.icon;
          return (
            <Card key={role}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${info.color}`} />
                  <CardTitle className="text-base">{info.label}</CardTitle>
                </div>
                <CardDescription className="text-xs">{info.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">{roleCounts[role] ?? 0} kullanıcı</Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Permission matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Yetki Matrisi</CardTitle>
          <CardDescription>Her rolün hangi modüllere erişebildiğini gösteren karşılaştırma tablosu</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[240px]">Yetki</TableHead>
                {ROLES.map(role => (
                  <TableHead key={role} className="text-center">
                    <span className="flex items-center justify-center gap-1">
                      {React.createElement(ROLE_INFO[role].icon, { className: `h-4 w-4 ${ROLE_INFO[role].color}` })}
                      {ROLE_INFO[role].label}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {PERMISSIONS.map(perm => (
                <TableRow key={perm.key}>
                  <TableCell className="font-medium">{perm.label}</TableCell>
                  {ROLES.map(role => (
                    <TableCell key={role} className="text-center">
                      {PERMISSION_MATRIX[role][perm.key] ? (
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-red-400 mx-auto" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User role assignment */}
      <Card>
        <CardHeader>
          <CardTitle>Kullanıcı Rol Ataması</CardTitle>
          <CardDescription>Kullanıcıların rollerini buradan değiştirebilirsiniz</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Yükleniyor...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>E-posta</TableHead>
                  <TableHead>Mevcut Rol</TableHead>
                  <TableHead className="w-[200px]">Rol Değiştir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(u => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        {React.createElement(ROLE_INFO[u.role]?.icon || User, { className: `h-3 w-3 ${ROLE_INFO[u.role]?.color || ""}` })}
                        {ROLE_INFO[u.role]?.label || u.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={u.role}
                        onValueChange={(val) => handleRoleChange(u.id, val)}
                        disabled={updating === u.id}
                      >
                        <SelectTrigger className="h-8 w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLES.map(role => (
                            <SelectItem key={role} value={role}>
                              {ROLE_INFO[role].label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
