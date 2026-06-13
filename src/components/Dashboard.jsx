import React from 'react';

export default function Dashboard({ setView }) {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-usm-blue mb-2">
        ¡Hola, Jorge Tapia!
      </h1>
      <p className="text-gray-600 mb-8">
        ¿Qué deseas realizar hoy en la plataforma de servicios del campus?
      </p>

      {/* Grid de Accesos Directos mediante Tarjetas (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={() => setView('create')}
          className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-usm-gold transition-all group text-left"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-usm-blue text-2xl mb-4 group-hover:bg-blue-100 transition-colors">
            📝
          </div>
          <span className="text-lg font-semibold text-usm-blue mb-2">
            Reportar una Nueva Incidencia
          </span>
          <span className="text-sm text-gray-500 text-center">
            Inicia un requerimiento por problemas de infraestructura o fallas técnicas de TI.
          </span>
        </button>

        <button 
          onClick={() => setView('tickets')}
          className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-usm-gold transition-all group text-left"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-usm-blue text-2xl mb-4 group-hover:bg-blue-100 transition-colors">
            🔍
          </div>
          <span className="text-lg font-semibold text-usm-blue mb-2">
            Mis Tickets y Seguimiento
          </span>
          <span className="text-sm text-gray-500 text-center">
            Revisa el estado en tiempo real y la trazabilidad de tus solicitudes anteriores.
          </span>
        </button>
      </div>
    </div>
  );
}