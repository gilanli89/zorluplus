import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { UserPlus, Ban, Trash2, ShieldCheck, Loader2 } from "lucide-react";

interface UserRow {
  id: string;
  email: string;
  created_at: string;
  banned_until: string | null;
  role: string;
  role_id: string | null;
}

const ROLE_LABELS: Record<string, string> = {
  super_admin: "Süper Admin",
  admin: "Admin",
  moderator: "Moderatör",
  user: "Kullanıcı",
};

const ROLE_COLORS: Record<string, string> = {
  super_admin: "bg-destructive text-destructive-foreground",
  admin: "bg-primary text-primary-foreground",
  moderator: "bg-secondary text-secondary-foreground",
  user: "bg-muted text-muted-foreground",
};

async function callAdminUsers(method: string, body?: unknown) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("No session");

  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  const url = `https://${projectId}.supabase.co/functions/v1/admin-users`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Request failed");
  return json;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // New user form
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("admin");
  const [creating, setCreating] = useState(false);

  // Role detail dialog
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [editRole, setEditRole] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await callAdminUsers("GET");
      setUsers(data.users ?? []);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleCreate = async () => {
    if (!newEmail || !newPassword) { toast.error("Email ve şifre zorunlu"); return; }
    if (newPassword.length < 6) { toast.error("Şifre en az 6 karakter olmalı"); return; }
    try {
      setCreating(true);
      await callAdminUsers("POST", { email: newEmail, password: newPassword, role: newRole });
      toast.success("Kullanıcı oluşturuldu");
      setDialogOpen(false);
      setNewEmail(""); setNewPassword(""); setNewRole("admin");
      fetchUsers();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setCreating(false);
    }
  };

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      setActionLoading(userId);
      await callAdminUsers("PATCH", { user_id: userId, action: "role", role });
      toast.success("Rol güncellendi");
      setSelectedUser(null);
      fetchUsers();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setActionLoading(null);
    }
  };

  const openUserDetail = (user: UserRow) => {
    setSelectedUser(user);
    setEditRole(user.role);
  };

  const handleBanToggle = async (user: UserRow) => {
    const isBanned = !!user.banned_until && new Date(user.banned_until) > new Date();
    try {
      setActionLoading(user.id);
      await callAdminUsers("PATCH", { user_id: user.id, action: "ban", ban: !isBanned });
      toast.success(isBanned ? "Kullanıcı aktifleştirildi" : "Kullanıcı askıya alındı");
      fetchUsers();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      setActionLoading(userId);
      await callAdminUsers("DELETE", { user_id: userId });
      toast.success("Kullanıcı silindi");
      fetchUsers();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setActionLoading(null);
    }
  };

  const isBanned = (u: UserRow) => !!u.banned_until && new Date(u.banned_until) > new Date();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kullanıcı Yönetimi</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><UserPlus className="h-4 w-4" /> Yeni Kullanıcı</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Yeni Kullanıcı Ekle</DialogTitle><DialogDescription>Sisteme yeni bir kullanıcı ekleyin ve rol atayın.</DialogDescription></DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="ornek@email.com" />
              </div>
              <div className="space-y-2">
                <Label>Şifre (min 6 karakter)</Label>
                <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••" />
              </div>
              <div className="space-y-2">
                <Label>Rol</Label>
                <Select value={newRole} onValueChange={setNewRole}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Süper Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Moderatör</SelectItem>
                    <SelectItem value="user">Kullanıcı</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreate} disabled={creating} className="gap-2">
                {creating && <Loader2 className="h-4 w-4 animate-spin" />} Oluştur
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Tüm Kullanıcılar</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          ) : users.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Henüz kullanıcı yok</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Kayıt Tarihi</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(u => (
                  <TableRow key={u.id} className={isBanned(u) ? "opacity-60" : ""}>
                    <TableCell>
                      <button
                        onClick={() => openUserDetail(u)}
                        className="font-medium text-primary underline-offset-4 hover:underline cursor-pointer"
                      >
                        {u.email}
                      </button>
                    </TableCell>
                    <TableCell>
                      <Badge className={ROLE_COLORS[u.role] || ""}>
                        {ROLE_LABELS[u.role] || u.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {isBanned(u) ? (
                        <Badge variant="destructive">Askıda</Badge>
                      ) : (
                        <Badge className="bg-green-600 text-white hover:bg-green-700">Aktif</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(u.created_at).toLocaleDateString("tr-TR")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="sm"
                          variant={isBanned(u) ? "outline" : "secondary"}
                          className="gap-1"
                          disabled={actionLoading === u.id}
                          onClick={() => handleBanToggle(u)}
                        >
                          {isBanned(u) ? <ShieldCheck className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                          {isBanned(u) ? "Aktifleştir" : "Askıya Al"}
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive" className="gap-1" disabled={actionLoading === u.id}>
                              <Trash2 className="h-3.5 w-3.5" /> Sil
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Kullanıcıyı Sil</AlertDialogTitle>
                              <AlertDialogDescription>
                                <strong>{u.email}</strong> kullanıcısı kalıcı olarak silinecek. Bu işlem geri alınamaz.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>İptal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(u.id)}>Sil</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Role Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kullanıcı Detayı</DialogTitle>
            <DialogDescription>Kullanıcı bilgilerini görüntüleyin ve rolünü değiştirin.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-2">
              <div className="space-y-1">
                <Label className="text-muted-foreground text-xs">Email</Label>
                <p className="font-medium">{selectedUser.email}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground text-xs">Kayıt Tarihi</Label>
                <p className="text-sm">{new Date(selectedUser.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground text-xs">Mevcut Rol</Label>
                <div>
                  <Badge className={ROLE_COLORS[selectedUser.role] || ""}>
                    {ROLE_LABELS[selectedUser.role] || selectedUser.role}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Rol Değiştir</Label>
                <Select value={editRole} onValueChange={setEditRole}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Süper Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Moderatör</SelectItem>
                    <SelectItem value="user">Kullanıcı</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedUser(null)}
            >
              İptal
            </Button>
            <Button
              onClick={() => selectedUser && handleRoleChange(selectedUser.id, editRole)}
              disabled={actionLoading === selectedUser?.id || editRole === selectedUser?.role}
              className="gap-2"
            >
              {actionLoading === selectedUser?.id && <Loader2 className="h-4 w-4 animate-spin" />}
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
