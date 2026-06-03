import { useState, useRef, useEffect } from "react";
import { ChevronDown, GraduationCap, LogOut, User, Menu } from "lucide-react";

interface HeaderProps {
  onOpenMobileMenu?: () => void;
  onNavigate?: (view: any) => void; // 🔄 Agregamos la propiedad de navegación
}

export function Header({ onOpenMobileMenu, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [email, setEmail] = useState("");
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
    <>
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 shrink-0 relative z-40">
        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="p-2 -ml-2 rounded-lg text-muted-foreground hover:bg-secondary md:hidden block cursor-pointer"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>

          <div className="h-9 w-9 md:h-10 md:w-10 rounded-md bg-primary text-primary-foreground grid place-items-center font-bold">
            <GraduationCap className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          <div className="leading-tight">
            <p className="text-[9px] md:text-[11px] uppercase tracking-widest text-muted-foreground">
              Universidad Santa María
            </p>
            <p className="text-xs md:text-sm font-semibold text-foreground">Mesa de Servicios 360</p>
          </div>
        </div>

        {/* Perfil de Usuario */}
        <div className="relative" ref={menuRef}>
          <button 
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 md:gap-3 rounded-full pl-1.5 pr-2.5 md:pl-2 md:pr-3 py-1.5 hover:bg-secondary transition-colors cursor-pointer"
          >
            <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-accent text-accent-foreground grid place-items-center font-semibold text-xs md:text-sm">
              JT
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <p className="text-sm font-semibold text-foreground">Jorge Tapia</p>
              <p className="text-[11px] text-muted-foreground">Estudiante</p>
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-card border border-border rounded-xl shadow-xl p-1.5 space-y-0.5 z-50 animate-in fade-in slide-in-from-top-2 duration-100">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                Opciones de cuenta
              </div>

              {/* 🛠️ BOTÓN CORREGIDO: Ahora gatilla la navegación a la vista de perfil */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  if (onNavigate) onNavigate("profile");
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left cursor-pointer"
              >
                <User className="h-3.5 w-3.5 text-muted-foreground" /> Mi Perfil Estudiante
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsLoggedIn(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left border-t border-border mt-1 pt-2 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" /> Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 🚪 LOGIN SUPERPUESTO */}
      {!isLoggedIn && (
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
                setIsLoggedIn(true); 
              }} 
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Correo Electrónico
                </label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jorge.tapia@sansano.usm.cl"
                  className="w-full px-3 py-2.5 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground bg-background"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Contraseña
                </label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground bg-background"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm mt-2"
              >
                Ingresar con Microsoft O365
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}