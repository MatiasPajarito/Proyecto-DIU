import { useState, useRef, useEffect } from "react";
import { ChevronDown, GraduationCap, LogOut, User, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface HeaderProps {
  onOpenMobileMenu?: () => void;
  onNavigate?: (view: any) => void;
}

export function Header({ onOpenMobileMenu, onNavigate }: HeaderProps) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 shrink-0 relative z-40">
      <div className="flex items-center gap-2 md:gap-3">
        {/* BOTÓN MENÚ HAMBURGUESA (Solo en celulares) */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="p-2 -ml-2 rounded-lg text-muted-foreground hover:bg-secondary md:hidden block cursor-pointer"
          aria-label="Abrir menú de navegación"
        >
          <Menu className="h-5 w-5 text-foreground" />
        </button>
        
        {/* 🚀 LOGO CLICKABLE QUE LLEVA AL INICIO */}
        <div 
          onClick={() => onNavigate?.("home")}
          className="flex items-center gap-2 md:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          title="Volver al inicio"
        >
          <div className="h-9 w-9 md:h-10 md:w-10 rounded-md bg-primary text-primary-foreground grid place-items-center font-bold shadow-sm">
            <GraduationCap className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          <div className="leading-tight">
            <p className="text-[9px] md:text-[11px] uppercase tracking-widest text-muted-foreground">
              Universidad Santa María
            </p>
            <p className="text-xs md:text-sm font-semibold text-foreground">Mesa de Servicios 360</p>
          </div>
        </div>
      </div>

      {/* MENÚ DE PERFIL DE USUARIO */}
      {user && (
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 md:gap-3 rounded-full pl-1.5 pr-2.5 md:pl-2 md:pr-3 py-1.5 hover:bg-secondary transition-colors cursor-pointer"
          >
            <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-accent text-accent-foreground grid place-items-center font-semibold text-xs md:text-sm">
              {user.initials}
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <p className="text-sm font-semibold text-foreground">{user.name}</p>
              <p className="text-[11px] text-muted-foreground">{user.role}</p>
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {/* DROPDOWN DEL PERFIL */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-card border border-border rounded-xl shadow-xl p-1.5 space-y-0.5 z-50 animate-in fade-in slide-in-from-top-2 duration-100">
              <div className="px-3 py-1.5">
                <p className="text-xs font-bold text-foreground truncate">{user.name}</p>
                <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
              </div>
              <div className="border-t border-border pt-1">
                <button
                  type="button"
                  onClick={() => { setIsOpen(false); if (onNavigate) onNavigate("profile"); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left cursor-pointer"
                >
                  <User className="h-3.5 w-3.5 text-muted-foreground" /> Mi Perfil Estudiante
                </button>
                <button
                  type="button"
                  onClick={() => { setIsOpen(false); logout(); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" /> Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}