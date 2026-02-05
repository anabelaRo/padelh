// src/pages/Dashboard.jsx
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/database";
import { Trophy, Users, Calendar, ArrowRight } from "lucide-react";

export default function Dashboard({ setPage }) {
  const matches = useLiveQuery(() => db.matches.toArray()) || [];
  const players = useLiveQuery(() => db.players.toArray()) || [];

  const getWinner = (sets) => {
    if (!sets) return null;
    try {
      const setsArray = sets.split("/");
      let winsA = 0, winsB = 0;
      setsArray.forEach(set => {
        const [a, b] = set.trim().split("-").map(Number);
        if (a > b) winsA++; else if (b > a) winsB++;
      });
      return winsA > winsB ? "A" : "B";
    } catch { return null; }
  };

  const lastMatch = matches.length > 0 ? matches[matches.length - 1] : null;
  const winnerSide = lastMatch ? getWinner(lastMatch.sets) : null;

  return (
    <div className="p-5 pb-24 bg-gray-50 min-h-screen font-sans text-zinc-900">
      {/* Header con saludo sutil */}
      <header className="flex justify-between items-center mb-8 pt-2">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-800">Hola! 🎾</h1>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Tu resumen de hoy</p>
        </div>
        <div className="bg-white p-2 rounded-full shadow-sm border border-zinc-100">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
            {players.length}
          </div>
        </div>
      </header>

      {/* Stats Cards: Modernas y con relieve sutil */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-zinc-100 relative overflow-hidden">
          <Trophy className="text-green-500 opacity-20 absolute -right-2 -bottom-2" size={60} />
          <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">Partidos</p>
          <p className="text-3xl font-black text-zinc-800">{matches.length}</p>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-zinc-100">
          <Users className="text-zinc-300 mb-2" size={20} />
          <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">Jugadores</p>
          <p className="text-3xl font-black text-zinc-800">{players.length}</p>
        </div>
      </div>

      {/* Card de Último Partido: El "Intermedio" */}
      <section className="mb-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 px-1">Último Encuentro</h3>
        
{lastMatch ? (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-md shadow-zinc-200/50 border border-zinc-100">
      <div className="flex justify-between items-center mb-6">
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 bg-zinc-50 px-3 py-1 rounded-full">
          <Calendar size={12} /> {lastMatch.date}
        </span>
        <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase truncate max-w-[100px]">
          {lastMatch.club}
        </span>
      </div>

      {/* Contenedor Principal del Resultado */}
      <div className="flex items-center justify-between gap-2">
        {/* Pareja A - Alineación izquierda */}
        <div className="w-1/3">
          <p className={`text-[11px] sm:text-xs leading-tight transition-all ${winnerSide === 'A' ? 'font-black text-zinc-900' : 'font-medium text-zinc-300'}`}>
            {lastMatch.p1}<br/>{lastMatch.p2}
          </p>
        </div>

        {/* Marcador Central - Ancho Flexible pero contenido */}
        <div className="flex-shrink-0 flex flex-col items-center min-w-[80px]">
          <div className="bg-zinc-900 text-green-400 px-3 py-2 rounded-xl font-mono font-black text-sm sm:text-base shadow-lg shadow-green-900/10 whitespace-nowrap">
            {lastMatch.sets}
          </div>
          <div className="h-4 w-[1px] bg-zinc-100 my-1"></div>
        </div>

        {/* Pareja B - Alineación derecha */}
        <div className="w-1/3 text-right">
          <p className={`text-[11px] sm:text-xs leading-tight transition-all ${winnerSide === 'B' ? 'font-black text-zinc-900' : 'font-medium text-zinc-300'}`}>
            {lastMatch.p3}<br/>{lastMatch.p4}
          </p>
        </div>
      </div>

      {winnerSide && (
  <div className="mt-6 flex justify-center">
    <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-[0.15em]">
       <Trophy size={10} className="text-green-500" /> 
       Ganadores: 
       <span className="text-green-500 ml-1">
         {winnerSide === 'A' 
           ? `${lastMatch.p1} y ${lastMatch.p2}` 
           : `${lastMatch.p3} y ${lastMatch.p4}`
         }
       </span>
    </div>
  </div>
)}
    </div>
  ) : (
          <div className="bg-zinc-100/50 border-2 border-dashed border-zinc-200 rounded-[2.5rem] h-40 flex items-center justify-center">
            <p className="text-xs font-bold text-zinc-400">Sin partidos recientes</p>
          </div>
        )}
      </section>

     <button 
        type="button"
        onClick={() => {
          console.log("Intentando navegar a historial...");
          setPage('history');
        }}
        className="w-full mt-8 bg-white border border-zinc-100 p-4 rounded-2xl flex items-center justify-between group active:scale-95 transition-all shadow-sm"
      >
        <span className="text-xs font-black uppercase tracking-widest text-zinc-600">
          Ver historial completo
        </span>
        <div className="bg-zinc-900 text-white p-1 rounded-lg">
          <ArrowRight size={16} />
        </div>
      </button>
    </div>
  );
}