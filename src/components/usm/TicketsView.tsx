import { useState } from "react";
import { Check, X, MapPin, MessageSquare, Inbox } from "lucide-react";
import type { Ticket, ViewKey } from "./types";
import { STATUS_FLOW } from "./types";
// Importamos los componentes de diálogo integrados
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function TicketsView({
  tickets,
  onCancel,
  onNavigate,
}: {
  tickets: Ticket[];
  onCancel: (id: string) => void;
  onNavigate: (v: ViewKey) => void;
}) {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Mis requerimientos</h2>
          <p className="mt-1 text-muted-foreground">
            Sigue el avance de cada reporte paso a paso.
          </p>
        </div>
        <button
          onClick={() => onNavigate("create")}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-95 transition-opacity"
        >
          + Nuevo ticket
        </button>
      </div>

      {tickets.length === 0 ? (
        <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
          <Inbox className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-foreground font-semibold">Aún no tienes reportes activos</p>
          <p className="text-sm text-muted-foreground mt-1">
            Cuando crees un ticket, podrás darle seguimiento desde aquí.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {tickets.map((t) => (
            <TicketCard key={t.id} ticket={t} onCancel={onCancel} />
          ))}
        </div>
      )}
    </div>
  );
}

function TicketCard({ ticket, onCancel }: { ticket: Ticket; onCancel: (id: string) => void }) {
  const currentIdx = STATUS_FLOW.indexOf(ticket.status);
  const canCancel = currentIdx <= 1 && ticket.status !== "Solucionado";
  
  // Estado local por tarjeta para controlar el modal integrado sin colisiones
  const [showCancelModal, setShowCancelModal] = useState(false);

  return (
    <article className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                  ticket.category === "TI"
                    ? "bg-accent/10 text-accent"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {ticket.category}
              </span>
              <span className="text-xs text-muted-foreground">#{ticket.id}</span>
            </div>
            <h3 className="text-lg font-bold text-foreground">{ticket.title}</h3>
            <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {ticket.location}
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Estado</p>
            <p className="text-sm font-bold text-accent">{ticket.status}</p>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center">
          {STATUS_FLOW.map((step, i) => {
            const reached = i <= currentIdx;
            const active = i === currentIdx;
            return (
              <div key={step} className="flex-1 flex items-center last:flex-none">
                <div className="flex flex-col items-center min-w-[60px]">
                  <div
                    className={`h-9 w-9 rounded-full grid place-items-center text-xs font-bold border-2 transition-all ${
                      active
                        ? "bg-accent text-accent-foreground border-accent ring-4 ring-accent/20 animate-pulse"
                        : reached
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-muted-foreground border-border"
                    }`}
                  >
                    {reached && !active ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  <p
                    className={`mt-2 text-[11px] font-semibold text-center max-w-[90px] leading-tight ${
                      reached ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step}
                  </p>
                </div>
                {i < STATUS_FLOW.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-1 -mt-6 rounded ${
                      i < currentIdx ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div className="px-6 py-5 bg-secondary/40 border-t border-border">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-semibold text-foreground">Mensajes y alertas</p>
        </div>
        <ul className="space-y-2">
          {ticket.messages.map((m, i) => (
            <li
              key={i}
              className="bg-card border border-border rounded-lg px-3 py-2 text-sm flex items-start justify-between gap-3"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wide text-accent">
                  {m.from}
                </span>
                <p className="text-foreground">{m.text}</p>
              </div>
              <span className="text-[11px] text-muted-foreground whitespace-nowrap">{m.at}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 py-4 flex items-center justify-between border-t border-border">
        <p className="text-xs text-muted-foreground">Creado el {ticket.createdAt}</p>
        {canCancel && (
          <button
            type="button"
            onClick={() => setShowCancelModal(true)} // Activamos nuestro modal estructurado
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-destructive bg-destructive/10 hover:bg-destructive/15 border border-destructive/30 transition-colors"
          >
            <X className="h-4 w-4" /> Cancelar Requerimiento
          </button>
        )}
      </div>

      {/* ⚠️ VENTANA COMPONENTE: Diálogo Optimizado para Alta Legibilidad (Clase 11 y 12) */}
      <AlertDialog open={showCancelModal} onOpenChange={setShowCancelModal}>
        <AlertDialogContent className="bg-card border border-border rounded-2xl p-6 shadow-xl max-w-md w-full">
          <AlertDialogHeader>
            {/* Título descriptivo con jerarquía clara */}
            <AlertDialogTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              ⚠️ ¿Confirmar cancelación del requerimiento?
            </AlertDialogTitle>
            
            {/* Contraste corregido con texto oscuro y negritas estructuradas nativas de React */}
            <AlertDialogDescription className="text-sm text-slate-800 mt-3 leading-relaxed block">
              <span className="block mb-3 text-slate-900">
                Esta acción <strong className="font-bold text-slate-950">detendrá de inmediato</strong> el proceso de revisión técnica de tu solicitud.
              </span>
              
              {/* Bloque destacado para escaneo visual rápido - Ideal para usuarios perezosos */}
              <span className="block bg-amber-50 text-amber-950 border border-amber-200 rounded-xl p-3 text-xs font-medium leading-relaxed">
                🌱 <strong className="font-bold text-amber-950">Impacto operacional:</strong> Al cancelar a tiempo cuando el problema ya se resolvió, liberas al técnico asignado para atender otras salas de la universidad con mayor urgencia.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {/* Botones de Cierre Explícito con Hover e Interacción Corregidas para no perder el contraste */}
          <AlertDialogFooter className="mt-5 flex items-center justify-end gap-3 pt-3 border-t border-border">
            <AlertDialogCancel
              type="button"
              onClick={() => setShowCancelModal(false)}
              className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 active:bg-slate-300 transition-colors border-none cursor-pointer"
            >
              Volver atrás
            </AlertDialogCancel>
            <AlertDialogAction
              type="button"
              onClick={() => {
                onCancel(ticket.id);
                setShowCancelModal(false);
              }}
              className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-colors shadow-sm cursor-pointer"
            >
              Sí, cancelar requerimiento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </article>
  );
}