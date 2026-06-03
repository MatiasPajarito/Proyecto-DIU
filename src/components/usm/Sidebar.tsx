import { useState } from "react";
import { Home, PenSquare, ClipboardList, BookOpen, X } from "lucide-react";
import type { ViewKey } from "./types";

interface SidebarProps {
  currentView: ViewKey;
  onNavigate: (v: ViewKey) => void;
  activeTicketsCount: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ currentView, onNavigate, activeTicketsCount, isMobileOpen, onCloseMobile }: SidebarProps) {
  // 🔐 CONTROL DE HOVER REAL: Detecta con precisión milimétrica cuándo el mouse entra y sale de la barra
  const [isHovered, setIsHovered] = useState(false);
  
  const menuItems = [
    { key: "home" as ViewKey, label: "Inicio", icon: Home },
    { key: "create" as ViewKey, label: "Crear Ticket", icon: PenSquare },
    { key: "tickets" as ViewKey, label: "Mis Requerimientos", icon: ClipboardList, badge: activeTicketsCount },
    { key: "knowledge" as ViewKey, label: "Base de Conocimiento", icon: BookOpen },
  ];

  const handleNavigation = (view: ViewKey) => {
    onNavigate(view);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* 🌫️ CAPA OSCURA MÓVIL */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/60 z-40 md:hidden block animate-in fade-in duration-200 backdrop-blur-xs" 
        />
      )}

      {/* 🎛️ CONTENEDOR PRINCIPAL: Ancho ultra-preciso en PC (72px) que expande a 260px solo en Hover real */}
      <aside 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`min-h-screen h-full bg-[#001c33] text-white flex flex-col justify-between border-r border-slate-800 fixed md:relative z-50 md:z-30 transition-all duration-300 ease-in-out select-none shrink-0 top-0 left-0 ${
          isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"
        } ${isHovered ? "md:w-64" : "md:w-[72px]"}`}
      >
        <div className="flex flex-col pt-4">
          
          {/* Encabezado: Título USM (Sólo existe en código si isHovered es true o si estás en celular) */}
          <div className="px-5 mb-6 h-8 flex items-center justify-between overflow-hidden whitespace-nowrap">
            {(isHovered || isMobileOpen) ? (
              <div className="flex flex-col min-w-[150px] animate-in fade-in duration-200">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                  MESA 360
                </span>
                <span className="text-sm font-bold text-white tracking-tight">
                  Proactivanet USM
                </span>
              </div>
            ) : (
              // Cuando está cerrado, mantenemos un marcador de posición del mismo ancho para que no salte el layout
              <div className="w-6 h-6 shrink-0" />
            )}
            
            {/* Botón de cierre para celulares */}
            <button 
              type="button"
              onClick={onCloseMobile}
              className="md:hidden block p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Enlaces del Menú de Navegación */}
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleNavigation(item.key)}
                  className={`w-full flex items-center rounded-xl p-3 transition-all duration-200 cursor-pointer overflow-hidden whitespace-nowrap ${
                    isActive
                      ? "bg-[#002447] text-white font-semibold shadow-inner"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  } ${isHovered ? "justify-between px-4" : "justify-center"}`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Icono perfectamente centrado y estático */}
                    <div className="h-6 w-6 flex items-center justify-center shrink-0">
                      <Icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? "text-white" : "text-slate-400"}`} />
                    </div>
                    
                    {/* 🛡️ ELIMINACIÓN ABSOLUTA: Si no hay hover, el texto se destruye del DOM, es imposible que se asome */}
                    {(isHovered || isMobileOpen) && (
                      <span className="text-sm tracking-wide text-left truncate animate-in fade-in duration-200">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {/* Badge numérico de requerimientos */}
                  {item.badge !== undefined && item.badge > 0 && (
                    <>
                      {(isHovered || isMobileOpen) ? (
                        <span className="min-w-[1.25rem] h-5 px-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold grid place-items-center animate-in fade-in duration-200 shrink-0">
                          {item.badge}
                        </span>
                      ) : (
                        // En modo contraído ponemos un pequeño punto de notificación sobre el icono si quieren, o nada
                        <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full md:block hidden" />
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sección de Versión Inferior */}
        {(isHovered || isMobileOpen) && (
          <div className="p-4 border-t border-slate-800 text-center overflow-hidden whitespace-nowrap animate-in fade-in duration-200">
            <span className="text-[10px] text-slate-500 font-medium tracking-wider block">
              Mesa de Servicios USM · 2026
            </span>
          </div>
        )}
      </aside>
    </>
  );
}