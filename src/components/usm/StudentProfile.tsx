import { GraduationCap, Mail, ClipboardList } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface StudentProfileProps {
  tickets: { id: string; title: string; status: string; createdAt: string }[];
}

export function StudentProfile({ tickets }: StudentProfileProps) {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto mt-4 space-y-4">
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-accent text-accent-foreground grid place-items-center text-2xl font-bold shrink-0">
            {user.initials}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.role} · {user.career}</p>
            <p className="text-sm text-muted-foreground">{user.campus}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          {user.email}
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-bold text-foreground">Historial de tickets</h3>
          <span className="ml-auto text-xs text-muted-foreground">{tickets.length} requerimiento{tickets.length !== 1 ? "s" : ""}</span>
        </div>
        {tickets.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">Aún no tienes tickets registrados.</p>
        ) : (
          <ul className="space-y-2">
            {tickets.map((t) => (
              <li key={t.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.createdAt}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  t.status === "Solucionado" ? "bg-green-100 text-green-700" :
                  t.status === "Recibido" ? "bg-blue-100 text-blue-700" :
                  "bg-amber-100 text-amber-700"
                }`}>
                  {t.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}