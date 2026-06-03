import { BookOpen } from "lucide-react";

const ARTICLES = [
  { t: "¿Cómo conecto mi notebook al proyector?", c: "Guía paso a paso con cables HDMI y VGA." },
  { t: "Wi-Fi USM: configuración inicial", c: "Conecta tu dispositivo a la red institucional." },
  { t: "Reporte de luminarias", c: "Qué información incluir para acelerar la atención." },
  { t: "Plataforma Aula Virtual", c: "Acceso, recuperación de contraseña y soporte." },
];

export function KnowledgeView() {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">Base de Conocimiento</h2>
        <p className="mt-1 text-muted-foreground">
          Antes de reportar, revisa si tu problema tiene una solución rápida.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ARTICLES.map((a) => (
          <button
            key={a.t}
            className="text-left bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-accent transition-all"
          >
            <div className="h-10 w-10 rounded-lg bg-accent/10 text-accent grid place-items-center mb-3">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground">{a.t}</h3>
            <p className="text-sm text-muted-foreground mt-1">{a.c}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
