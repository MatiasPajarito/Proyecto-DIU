import React, { useState } from 'react';

export default function CreateTicket({ setView }) {
  const [macroCategory, setMacroCategory] = useState(null); // 'ti' o 'infraestructura'

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-usm-blue mb-6">Crear Requerimiento de Soporte</h2>

      {/* Paso 1: Filtro Visual de Macro-categoría */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          1. Selecciona el tipo de problema:
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setMacroCategory('ti')}
            className={`p-4 rounded-lg border text-center font-medium transition-all ${
              macroCategory === 'ti' 
                ? 'border-usm-gold bg-blue-50 text-usm-blue' 
                : 'border-gray-200 hover:border-gray-300 text-gray-600'
            }`}
          >
            🖥️ Soporte Tecnológico / TI
          </button>
          <button
            type="button"
            onClick={() => setMacroCategory('infraestructura')}
            className={`p-4 rounded-lg border text-center font-medium transition-all ${
              macroCategory === 'infraestructura' 
                ? 'border-usm-gold bg-blue-50 text-usm-blue' 
                : 'border-gray-200 hover:border-gray-300 text-gray-600'
            }`}
          >
            🛠️ Mantenimiento e Infraestructura
          </button>
        </div>
      </div>

      {/* Paso 2: Campos Dinámicos en Lenguaje Natural */}
      {macroCategory && (
        <form onSubmit={(e) => { e.preventDefault(); setView('tickets'); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              2. ¿Cuál es el desperfecto específico?
            </label>
            <select className="w-full rounded-lg border border-gray-300 p-2.5 bg-white text-gray-700 focus:ring-1 focus:ring-usm-gold focus:border-usm-gold outline-none">
              {macroCategory === 'ti' ? (
                <>
                  <option>Falla de Proyector / Audio en Aula</option>
                  <option>Problemas de Conectividad (Wi-Fi / Red)</option>
                  <option>Falla en Computador de Laboratorio</option>
                </>
              ) : (
                <>
                  <option>Enchufes Sueltos o Problemas Eléctricos</option>
                  <option>Fallas en Luminaria (Ampolletas quemadas)</option>
                  <option>Problemas en Mobiliario (Sillas / Mesas dañadas)</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">3. Ubicación (Edificio y Sala)</label>
            <input 
              type="text" 
              placeholder="Ej: Edificio C, Sala C-201" 
              className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:ring-1 focus:ring-usm-gold focus:border-usm-gold"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">4. Descripción del Problema</label>
            <textarea 
              rows="4" 
              placeholder="Describe brevemente el desperfecto detectado para ayudar al equipo técnico..." 
              className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:ring-1 focus:ring-usm-gold focus:border-usm-gold"
              required
            ></textarea>
          </div>

          {/* Acciones del Formulario */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button 
              type="button" 
              onClick={() => setView('dashboard')}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm font-medium text-white bg-usm-blue hover:bg-opacity-90 rounded-lg shadow-sm transition-colors"
            >
              Enviar Reporte
            </button>
          </div>
        </form>
      )}
    </div>
  );
}