import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CreateTicket from './components/CreateTicket';
import MyTickets from './components/MyTickets';

export default function App() {
  const [view, setView] = useState('dashboard'); // dashboard, create, tickets

  return (
    <div className="flex h-screen bg-usm-bg font-sans overflow-hidden">
      {/* Barra Lateral de Navegación Simple */}
      <Sidebar currentView={view} setView={setView} />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Encabezado Único y Limpio */}
        <Header />

        {/* Contenedor Principal Dinámico */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {view === 'dashboard' && <Dashboard setView={setView} />}
          {view === 'create' && <CreateTicket setView={setView} />}
          {view === 'tickets' && <MyTickets />}
        </main>
      </div>
    </div>
  );
}