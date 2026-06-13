import { PenSquare, Search, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import type { ViewKey } from "./types";

export function HomeView({
  onNavigate,
  activeTicketsCount,
}: {
  onNavigate: (v: ViewKey) => void;
  activeTicketsCount: number;
}) {
  // 🔌 Extraemos el usuario conectado desde el cerebro central
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          {/* 🔄 Ahora el nombre se pinta dinámicamente según quién inicie sesión */}
          ¡Hola, {user?.name || "Estudiante"}! 👋
        </h2>
        <p className="mt-2 text-muted-foreground">
          ¿Qué necesitas reportar o revisar hoy en la universidad?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <button
          onClick={() => onNavigate("create")}
          className="group text-left bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-md hover:border-accent transition-all"
        >
          <div className="h-14 w-14 rounded-xl bg-accent/10 text-accent grid place-items-center mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
            <PenSquare className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Reportar una Nueva Incidencia</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Avísanos si encontraste un proyector que no enciende, una luminaria quemada en el
            pasillo o un enchufe dañado en tu sala. Mientras más claro lo describas, más rápido
            llegamos.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
            Crear ticket <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <button
          onClick={() => onNavigate("tickets")}
          className="group relative text-left bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-md hover:border-accent transition-all"
        >
          <div className="absolute top-6 right-6 min-w-[2.25rem] h-9 px-2 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-bold shadow-md">
            {activeTicketsCount}
          </div>
          <div className="h-14 w-14 rounded-xl bg-primary/10 text-primary grid place-items-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Search className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Mis Tickets y Seguimiento</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Revisa el estado de tus reportes en tiempo real, conversa con el técnico asignado y
            cancela aquellos que ya no necesitas atender.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
            Ver mis requerimientos <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
}