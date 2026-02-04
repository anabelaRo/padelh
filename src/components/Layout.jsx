// src/components/Layout.jsx
import { Home, Users, PlusCircle, History } from "lucide-react";

export default function Layout({ children, setPage, currentPage }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'players', icon: Users, label: 'Jugadores' },
    { id: 'new', icon: PlusCircle, label: 'Nuevo' },
    { id: 'history', icon: History, label: 'Historial' },
  ];

  return (
    <div className="max-w-md mx-auto relative bg-white min-h-screen">
      {children}
      <nav className="fixed bottom-0 w-full max-w-md bg-zinc-900 text-gray-400 flex justify-around py-3 rounded-t-2xl shadow-2xl">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setPage(tab.id)}
            className={`flex flex-col items-center gap-1 ${currentPage === tab.id ? 'text-green-400' : ''}`}
          >
            <tab.icon size={20} />
            <span className="text-[10px]">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
