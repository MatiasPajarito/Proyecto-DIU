import { useState } from "react";
import { Laptop2, Wrench, MapPin, ChevronDown, Sparkles } from "lucide-react";
import type { Ticket, ViewKey } from "./types";

type Category = "TI" | "Infraestructura";

const FAULT_OPTIONS: Record<Category, string[]> = {
  TI: [
    "Falla de Proyector / Audio",
    "Computador no enciende",
    "Internet / Wi-Fi sin conexión",
    "Problema con plataforma Aula Virtual",
  ],
  Infraestructura: [
    "Enchufes rotos / Problemas eléctricos",
    "Luminaria dañada",
    "Filtración de agua / Baño",
    "Mobiliario roto (silla, mesa, pizarra)",
  ],
};

// Estructura de datos limpia alineada con las pautas de automatización
const TEMPLATES: { label: string; category: Category; fault: string; desc: string }[] = [
  { 
    label: "Proyector sin imagen", 
    category: "TI",
    fault: "Falla de Proyector / Audio", 
    desc: "El proyector enciende pero no muestra imagen del computador. Ya intenté cambiar de cable HDMI sin éxito." 
  },
  { 
    label: "Luminaria intermitente", 
    category: "Infraestructura",
    fault: "Luminaria dañada", 
    desc: "La luminaria del pasillo parpadea intermitentemente desde hoy en la mañana. Afecta la visibilidad." 
  },
  { 
    label: "Enchufe sin energía", 
    category: "Infraestructura",
    fault: "Enchufes rotos / Problemas eléctricos", 
    desc: "El enchufe junto a la pizarra no entrega energía. Otros enchufes de la sala sí funcionan." 
  }
];

export function CreateTicketView({
  onCreate,
  onNavigate,
}: {
  onCreate: (t: Omit<Ticket, "id" | "createdAt" | "status" | "messages">) => void;
  onNavigate: (v: ViewKey) => void;
}) {
  const [category, setCategory] = useState<Category | null>(null);
  const [fault, setFault] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit = category && fault && location.trim() && description.trim();

  const submit = () => {
    if (!canSubmit || !category) return;
    onCreate({ title: fault, category, location: location.trim() });
    onNavigate("tickets");
  };

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">Crear nuevo ticket</h2>
        <p className="mt-1 text-muted-foreground">
          Cuéntanos qué pasa. Elige primero el tipo de problema.
        </p>
      </div>

      {/* Bimodal selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <SelectorCard
          icon={Laptop2}
          title="Soporte Tecnológico / TI"
          subtitle="Computadores, proyectores, Wi-Fi, plataformas"
          active={category === "TI"}
          onClick={() => {
            setCategory("TI");
            setFault("");
          }}
        />
        <SelectorCard
          icon={Wrench}
          title="Mantenimiento / Infraestructura"
          subtitle="Luminarias, enchufes, mobiliario, baños"
          active={category === "Infraestructura"}
          onClick={() => {
            setCategory("Infraestructura");
            setFault("");
          }}
        />
      </div>

      {category && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <Field label="Tipo de desperfecto">
              <div className="relative">
                <select
                  value={fault}
                  onChange={(e) => setFault(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Selecciona una opción…</option>
                  {FAULT_OPTIONS[category].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </Field>

            {/* Ajuste de formato permanente en la etiqueta para que no se olvide al escribir (Clase 11) */}
            <Field 
              label="Ubicación exacta" 
              sublabel="Formato requerido: Edificio/Bloque - Sala (Ej: Edificio C, Sala C-201)" 
              required
            >
              <div className="relative">
                <MapPin className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej: Edificio C, Sala C-201"
                  className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </Field>

            <Field label="Descripción del problema">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Describe en tus palabras qué está pasando, cuándo ocurrió y cómo afecta la clase."
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </Field>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => onNavigate("home")}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-muted-foreground bg-secondary hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={!canSubmit}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              >
                Enviar Reporte
              </button>
            </div>
          </div>

          <aside className="bg-card border border-border rounded-2xl p-5 shadow-sm h-fit">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-bold text-foreground">Plantillas rápidas</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Inyecta texto sin salir de esta pantalla.
            </p>
            <div className="space-y-2">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.label}
                  type="button"
                  onClick={() => {
                    // Automatización inteligente: Setea la categoría macro, la opción específica y la descripción
                    setCategory(tpl.category);
                    setFault(tpl.fault);
                    setDescription(tpl.desc);
                  }}
                  className="w-full text-left p-3 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-colors"
                >
                  <p className="text-sm font-semibold text-foreground">{tpl.label}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{tpl.desc}</p>
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function SelectorCard({
  icon: Icon,
  title,
  subtitle,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-6 rounded-2xl border-2 transition-all ${
        active
          ? "border-accent bg-accent/5 shadow-md"
          : "border-border bg-card hover:border-accent/50"
      }`}
    >
      <div
        className={`h-12 w-12 rounded-xl grid place-items-center mb-4 ${
          active ? "bg-accent text-accent-foreground" : "bg-secondary text-primary"
        }`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    </button>
  );
}

function Field({
  label,
  sublabel,
  required,
  children,
}: {
  label: string;
  sublabel?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      {/* Texto auxiliar permanente arriba del input para cumplir con la Clase 11 */}
      {sublabel && (
        <span className="block text-xs text-muted-foreground mt-0.5 mb-2">
          {sublabel}
        </span>
      )}
      {!sublabel && <div className="mb-2" />}
      {children}
    </label>
  );
}