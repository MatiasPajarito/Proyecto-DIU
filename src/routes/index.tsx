import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sidebar } from "@/components/usm/Sidebar";
import { Header } from "@/components/usm/Header";
import { HomeView } from "@/components/usm/HomeView";
import { CreateTicketView } from "@/components/usm/CreateTicketView";
import { TicketsView } from "@/components/usm/TicketsView";
import { KnowledgeView } from "@/components/usm/KnowledgeView";
import type { Ticket, ViewKey } from "@/components/usm/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mesa de Servicios 360 · USM" },
      {
        name: "description",
        content:
          "Sistema unificado de reportes universitarios USM: crea tickets, da seguimiento y consulta la base de conocimiento.",
      },
    ],
  }),
  component: App,
});

const INITIAL_TICKETS: Ticket[] = [
  {
    id: "USM-1042",
    title: "Falla de Proyector / Audio",
    category: "TI",
    location: "Edificio C, Sala C-201",
    createdAt: "03 jun 2026, 09:15",
    status: "Técnico en Camino",
    messages: [
      { from: "Sistema", text: "Tu ticket fue recibido correctamente.", at: "09:15" },
      { from: "Sistema", text: "Asignado al área de Soporte Audiovisual.", at: "09:32" },
      {
        from: "Técnico",
        text: "Hola Jorge, voy en camino. Llego en aproximadamente 15 minutos.",
        at: "10:04",
      },
    ],
  },
  {
    id: "USM-1041",
    title: "Luminaria dañada",
    category: "Infraestructura",
    location: "Edificio A, Pasillo 2° piso",
    createdAt: "02 jun 2026, 16:40",
    status: "Recibido",
    messages: [
      { from: "Sistema", text: "Tu ticket fue recibido correctamente.", at: "16:40" },
    ],
  },
];

function App() {
  const [view, setView] = useState<ViewKey>("home");
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  
  // 📱 ESTADO RESPONSIVO: Controla si el cajón del menú se abre en teléfonos
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeCount = useMemo(
    () => tickets.filter((t) => t.status !== "Solucionado").length,
    [tickets],
  );

  const createTicket = (
    data: Pick<Ticket, "title" | "category" | "location">,
  ) => {
    const id = `USM-${1043 + tickets.length}`;
    const now = new Date();
    const fmt = now.toLocaleString("es-CL", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setTickets((prev) => [
      {
        id,
        ...data,
        createdAt: fmt,
        status: "Recibido",
        messages: [
          {
            from: "Sistema",
            text: "Tu ticket fue recibido correctamente. En breve será asignado.",
            at: now.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }),
          },
        ],
      },
      ...prev,
    ]);
  };

  const cancelTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="h-screen w-screen flex bg-background overflow-hidden relative font-sans antialiased">
      <Sidebar 
        currentView={view} 
        onNavigate={setView} 
        activeTicketsCount={activeCount} 
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* 🛠️ CORRECCIÓN: Le inyectamos 'onNavigate' al Header */}
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} onNavigate={setView} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-slate-50/50">
          {view === "home" && (
            <HomeView onNavigate={setView} activeTicketsCount={activeCount} />
          )}
          {view === "create" && (
            <CreateTicketView onCreate={createTicket} onNavigate={setView} />
          )}
          {view === "tickets" && (
            <TicketsView tickets={tickets} onCancel={cancelTicket} onNavigate={setView} />
          )}
          {(view === "kb" || view === "knowledge") && <KnowledgeView />}

          {/* 👤 VISTA NUEVA DE MI PERFIL: Muestra una tarjeta corporativa impecable para la Tarea 10 */}
          {view === "profile" && (
            <div className="max-w-md mx-auto bg-card border border-border rounded-2xl shadow-xl p-6 animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="flex items-center gap-4 border-b border-border pb-4 mb-4">
                <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground text-xl font-bold grid place-items-center">
                  JT
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Jorge Tapia</h2>
                  <p className="text-xs text-muted-foreground">jorge.tapia@sansano.usm.cl</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Rol Sansano</span>
                  <span className="text-sm font-semibold text-foreground">202373000-K</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Carrera</span>
                  <span className="text-sm font-semibold text-foreground">Ingeniería Civil Informática</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Campus / Sede</span>
                  <span className="text-sm font-semibold text-foreground">Campus Casa Central (Valparaíso)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setView("home")}
                className="w-full mt-6 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-bold py-2.5 rounded-lg transition-colors cursor-pointer text-center"
              >
                Volver al Inicio
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}