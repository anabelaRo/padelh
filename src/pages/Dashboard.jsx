import { useState, useMemo } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/database";
import { Trophy, Users, Calendar, ArrowRight, Filter, Activity } from "lucide-react";

export default function Dashboard({ setPage }) {
  const matches = useLiveQuery(() => db.matches.toArray()) || [];
  const players = useLiveQuery(() => db.players.toArray()) || [];
  const [timeFilter, setTimeFilter] = useState("semana_actual");

  // --- LÓGICA DE FILTROS ---
  const filteredMatches = useMemo(() => {
    const now = new Date();
    return matches.filter(m => {
      const matchDate = new Date(m.date + "T12:00:00");
      if (timeFilter === "semana_actual") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        return matchDate >= startOfWeek;
      }
      if (timeFilter === "semana_anterior") {
        const startOfLastWeek = new Date(now);
        startOfLastWeek.setDate(now.getDate() - now.getDay() - 7);
        const endOfLastWeek = new Date(now);
        endOfLastWeek.setDate(now.getDate() - now.getDay() - 1);
        return matchDate >= startOfLastWeek && matchDate <= endOfLastWeek;
      }
      if (timeFilter === "mes") return matchDate >= new Date(now.getFullYear(), now.getMonth(), 1);
      if (timeFilter === "anio") return matchDate >= new Date(now.getFullYear(), 0, 1);
      return true;
    });
  }, [matches, timeFilter]);

  // --- LÓGICA DE ESTADÍSTICAS ---
  const stats = useMemo(() => {
    const data = {};
    players.forEach(p => { data[p.name] = { pj: 0, pg: 0, pp: 0, gj: 0, gg: 0, gp: 0 }; });

    filteredMatches.forEach(m => {
      const sets = m.sets.split(" / ");
      let winsA = 0, winsB = 0, gA = 0, gB = 0;
      sets.forEach(s => {
        const [a, b] = s.split("-").map(Number);
        gA += a; gB += b;
        if (a > b) winsA++; else if (b > a) winsB++;
      });
      const winSide = winsA > winsB ? "A" : "B";
      [m.p1, m.p2, m.p3, m.p4].forEach(name => {
        if (!data[name]) return;
        data[name].pj += 1;
        const isSideA = (name === m.p1 || name === m.p2);
        data[name].gg += isSideA ? gA : gB;
        data[name].gp += isSideA ? gB : gA;
        data[name].gj += (gA + gB);
        if ((winSide === "A" && isSideA) || (winSide === "B" && !isSideA)) data[name].pg += 1;
        else data[name].pp += 1;
      });
    });
    return Object.entries(data).sort((a, b) => b[1].pg - a[1].pg);
  }, [filteredMatches, players]);

  const lastMatch = matches.length > 0 ? matches[matches.length - 1] : null;
  const getWinnerSide = (sets) => {
    if (!sets) return null;
    const s = sets.split(" / ")[0].split("-");
    return Number(s[0]) > Number(s[1]) ? "A" : "B";
  };
  const winnerSide = lastMatch ? getWinnerSide(lastMatch.sets) : null;

  return (
    <div className="p-5 pb-24 bg-gray-50 min-h-screen font-sans text-zinc-900">
      {/* CABECERA ORIGINAL "SPORT-CLEAN" */}
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

      {/* STATS CARDS ORIGINALES */}
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

      {/* ÚLTIMO ENCUENTRO CORREGIDO */}
      <section className="mb-10">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 px-1 flex items-center gap-2">
          <Activity size={14} /> Último Encuentro
        </h3>
        {lastMatch ? (
          <div className="bg-white rounded-[2.5rem] p-6 shadow-md border border-zinc-100">
             <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold text-zinc-400 bg-zinc-50 px-3 py-1 rounded-full uppercase italic">
                  {lastMatch.date}
                </span>
                <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase">
                  {lastMatch.club}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="w-1/3 text-center">
                  <p className={`text-[11px] leading-tight ${winnerSide === 'A' ? 'font-black text-zinc-900' : 'font-medium text-zinc-300'}`}>
                    {lastMatch.p1}<br/>{lastMatch.p2}
                  </p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center min-w-[80px]">
                  <div className="bg-zinc-900 text-green-400 px-3 py-2 rounded-xl font-mono font-black text-sm shadow-lg">
                    {lastMatch.sets}
                  </div>
                </div>
                <div className="w-1/3 text-center">
                  <p className={`text-[11px] leading-tight ${winnerSide === 'B' ? 'font-black text-zinc-900' : 'font-medium text-zinc-300'}`}>
                    {lastMatch.p3}<br/>{lastMatch.p4}
                  </p>
                </div>
              </div>
          </div>
        ) : <p className="text-center text-zinc-300 text-xs py-10">Sin partidos registrados</p>}
      </section>

      {/* NUEVA TABLA CON FILTROS */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Ranking</h3>
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-transparent text-[10px] font-black text-green-600 uppercase outline-none"
          >
            <option value="semana_actual">Semana Actual</option>
            <option value="semana_anterior">Semana Anterior</option>
            <option value="mes">Últ. Mes</option>
            <option value="anio">Últ. Año</option>
          </select>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-zinc-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-900 text-[8px] text-zinc-400 uppercase font-black">
                  <th className="p-3 text-white">JUGADOR</th>
                  <th className="p-2 text-center">PJ</th>
                  <th className="p-2 text-center text-green-400">PG</th>
                  <th className="p-2 text-center">%P</th>
                  <th className="p-2 text-center border-l border-zinc-800">GG</th>
                  <th className="p-2 text-center">%G</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {stats.map(([name, s]) => (
                  <tr key={name} className="text-[10px]">
                    <td className="p-3 font-bold text-zinc-700">{name}</td>
                    <td className="p-2 text-center">{s.pj}</td>
                    <td className="p-2 text-center font-black">{s.pg}</td>
                    <td className="p-2 text-center text-green-600 font-bold">{s.pj > 0 ? Math.round((s.pg/s.pj)*100) : 0}%</td>
                    <td className="p-2 text-center border-l border-zinc-50">{s.gg}</td>
                    <td className="p-2 text-center font-bold">{s.gj > 0 ? Math.round((s.gg/s.gj)*100) : 0}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* BOTÓN HISTORIAL */}
      <button onClick={() => setPage('history')} className="w-full mt-8 bg-white border border-zinc-100 p-4 rounded-2xl flex items-center justify-between group active:bg-zinc-50 transition-colors shadow-sm">
        <span className="text-xs font-black uppercase tracking-widest text-zinc-600">Ver historial completo</span>
        <div className="bg-zinc-900 text-white p-1 rounded-lg">
          <ArrowRight size={16} />
        </div>
      </button>
    </div>
  );
}
