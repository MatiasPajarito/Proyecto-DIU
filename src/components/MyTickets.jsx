import React from 'react';

export default function MyTickets() {
  // Simulación de un ticket activo en el sistema
  const activeTicket = {
    id: "RED-2026-00762",
    title: "Enchufe suelto en la sala A011",
    date: "30 de Mayo, 2026",
    status: 2, // Estado 2 representa "En Camino / Técnico Asignado"
  };

  const steps = ["Recibido", "Área Asignada", "Técnico en Camino", "Resuelto"];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-usm-blue">Estado de mis Requerimientos</h2>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 space-y-6">
        {/* Cabecera del Ticket */}
        <div className="flex justify-between items-start pb-4 border-b border-gray-100">
          <div>
            <span className="text-xs font-mono font-bold bg-blue-50 text-usm-blue px-2.5 py-1 rounded-full">
              ID: {activeTicket.id}
            </span>
            <h3 className="text-lg font-semibold text-usm-blue mt-2">{activeTicket.title}</h3>
            <p className="text-xs text-gray-400 mt-1">Reportado el: {activeTicket.date}</p>
          </div>
          {/* Botón de Cancelación para Control de Errores */}
          <button className="text-xs font-medium text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors border border-red-200">
            ❌ Cancelar Requerimiento
          </button>
        </div>

        {/* Stepper Gráfico: Solución al Desafío de Gestión Interna */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-4">Progreso de la Gestión Interna:</p>
          <div className="flex items-center justify-between relative">
            {/* Línea de fondo del progreso */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 z-0"></div>
            
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center z-10 bg-white px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  index <= activeTicket.status 
                    ? 'bg-green-600 text-white shadow-sm ring-4 ring-green-50' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index <= activeTicket.status ? '✓' : index + 1}
                </div>
                <span className={`text-xs mt-2 font-medium ${
                  index <= activeTicket.status ? 'text-green-700 font-semibold' : 'text-gray-400'
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}