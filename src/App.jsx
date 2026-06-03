import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import CreateTicket from './components/CreateTicket';
import MyTickets from './components/MyTickets';

export default function App() {
  const [view, setView] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Reemplazo provisorio del Sidebar para probar */}
      <div className="w-64 bg-slate-900 text-white p-4">
        <button onClick={() => setView('dashboard')} className="block mb-2">Dashboard</button>
        <button onClick={() => setView('create')} className="block mb-2">Crear Ticket</button>
        <button onClick={() => setView('tickets')} className="block">Mis Tickets</button>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Reemplazo provisorio del Header */}
        <header className="bg-white border-b p-4 text-right font-medium">
          Perfil: Jorge Tapia
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {view === 'dashboard' && <Dashboard setView={setView} />}[cite: 3]
          {view === 'create' && <CreateTicket setView={setView} />}[cite: 3]
          {view === 'tickets' && <MyTickets />}[cite: 3]
        </main>
      </div>
    </div>
  );
}