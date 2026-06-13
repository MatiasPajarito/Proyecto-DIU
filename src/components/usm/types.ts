export type ViewKey = "home" | "create" | "tickets" | "knowledge" | "profile";
export type TicketStatus = "Recibido" | "Área Asignada" | "Técnico en Camino" | "Solucionado";

export interface Ticket {
  id: string;
  title: string;
  category: "TI" | "Infraestructura";
  location: string;
  createdAt: string;
  status: TicketStatus;
  messages: { from: "Sistema" | "Técnico" | "Tú"; text: string; at: string }[];
}

export const STATUS_FLOW: TicketStatus[] = [
  "Recibido",
  "Área Asignada",
  "Técnico en Camino",
  "Solucionado",
];
