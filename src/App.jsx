import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Sidebar } from "./components/usm/Sidebar";
import { Header } from "./components/usm/Header";
import { HomeView } from "./components/usm/HomeView";
import { CreateTicketView } from "./components/usm/CreateTicketView";
import { TicketsView } from "./components/usm/TicketsView";
import { KnowledgeView } from "./components/usm/KnowledgeView";
import { StudentProfile } from "./components/usm/StudentProfile";
import { GraduationCap } from "lucide-react";

function AppContent() {
  // 1. Conectamos con el estado global de autenticación de Claude
  const { user, login } = useAuth(); 
  
  const [view, setView] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [emailInput, setEmailInput] = useState(""); // Captura lo que escribe el usuario

  const handleCreate = (data) => {
    const now = new Date();
    const count = tickets.length + 1;
    const id = `USM-${String(1040 + count).padStart(4, "0")}`;
    setTickets((prev) => [{
      ...data,
      id,
      createdAt: now.toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      status: "Recibido",
      messages: [{ from: "Sistema", text: "Tu ticket fue recibido correctamente.", at: now.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }) }],
    }, ...prev]);
  };

  const handleCancel = (id) => setTickets((prev) => prev.filter((t) => t.id !== id));

  // 2. 🚪 CONTROL DE ACCESO: Si el usuario no ha iniciado sesión, se bloquea la pantalla con el Login
  if (!user) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#001b33] flex items-center justify-center p-4 antialiased font-sans">
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 max-w-sm w-full">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground grid place-items-center font-bold mb-3 shadow-md">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Mesa de Servicios 360</h1>
            <p className="text-xs text-muted-foreground mt-1">Inicia sesión con tu cuenta institucional USM</p>
          </div>

          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              login(emailInput); 
            }} 
            className="space-y-4"
          >
            {/* 📧 CAMPO CORREO: Etiqueta Flotante Perfecta */}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="block w-full px-4 pb-2.5 pt-6 text-sm text-foreground bg-background rounded-lg border border-input appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary peer"
                placeholder=" " 
                required
              />
              <label
                htmlFor="email"
                className="absolute text-[11px] font-bold uppercase tracking-wider text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
              >
                Correo (ej. nombre.apellido@usm.cl)
              </label>
            </div>

            {/* 🔒 CAMPO CONTRASEÑA: Etiqueta Flotante Perfecta */}
            <div className="relative mt-2">
              <input
                type="password"
                id="password"
                required
                minLength={6}
                className="block w-full px-4 pb-2.5 pt-6 text-sm text-foreground bg-background rounded-lg border border-input appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-[11px] font-bold uppercase tracking-wider text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
              >
                Contraseña
              </label>
              <p className="text-[11px] font-medium text-muted-foreground mt-1.5 ml-1 text-left">
                * Mínimo 6 caracteres.
              </p>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-sm mt-4"
            >
              Ingresar con Microsoft O365
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. 🖥️ APLICACIÓN REAL: Cuando el usuario se loguea, ve todo el panel administrativo
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        currentView={view}
        onNavigate={setView}
        activeTicketsCount={tickets.length}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Header onOpenMobileMenu={() => setIsMobileOpen(true)} onNavigate={setView} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
          {view === "home"      && <HomeView onNavigate={setView} activeTicketsCount={tickets.length} />}
          {view === "create"    && <CreateTicketView onCreate={handleCreate} onNavigate={setView} />}
          {view === "tickets"   && <TicketsView tickets={tickets} onCancel={handleCancel} onNavigate={setView} />}
          {view === "knowledge" && <KnowledgeView />}
          {view === "profile"   && <StudentProfile tickets={tickets} />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}