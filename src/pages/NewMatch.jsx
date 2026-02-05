import { useState } from "react";
import { db } from "../db/database";
import { useLiveQuery } from "dexie-react-hooks";
import { Calendar, MapPin, Trophy } from "lucide-react";

export default function NewMatch({ setPage }) {
  const players = useLiveQuery(() => db.players.toArray()) || [];
  
  const [formData, setFormData] = useState({
    club: "", 
    p1: "", p2: "", p3: "", p4: "", 
    date: new Date().toISOString().split('T')[0]
  });

  // Estados para los 3 sets (cada uno con score de pareja A y pareja B)
  const [set1, set1Set] = useState({ a: "", b: "" });
  const [set2, set2Set] = useState({ a: "", b: "" });
  const [set3, set3Set] = useState({ a: "", b: "" });

  const saveMatch = async (e) => {
    e.preventDefault();
    if (!formData.p1 || !formData.p3) return alert("Selecciona jugadores");

    // Construir el string de sets (ej: "6-2 / 4-6 / 10-8") filtrando los vacíos
    const allSets = [set1, set2, set3]
      .filter(s => s.a !== "" && s.b !== "")
      .map(s => `${s.a}-${s.b}`)
      .join(" / ");

    if (!allSets) return alert("Carga al menos el resultado del primer set");

    await db.matches.add({
      ...formData,
      sets: allSets,
      timestamp: new Date(formData.date).getTime()
    });
    
    setPage('history');
  };

  return (
    <div className="p-5 pb-24 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h2 className="text-2xl font-black text-zinc-800 tracking-tight">Nuevo Partido</h2>
      </header>

      <form onSubmit={saveMatch} className="space-y-4">
        {/* Info General */}
        <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-zinc-100 space-y-3">
          <div className="flex items-center gap-3 border-b border-zinc-50 pb-2">
            <Calendar size={16} className="text-green-500" />
            <input type="date" className="w-full text-sm font-bold outline-none" value={formData.date} required onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-green-500" />
            <input className="w-full text-sm outline-none" placeholder="Club / Cancha" required value={formData.club} onChange={e => setFormData({...formData, club: e.target.value})} />
          </div>
        </div>

        {/* Parejas */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-[2rem] border-t-4 border-green-500 shadow-sm">
            <p className="text-[9px] font-black text-green-600 uppercase mb-3 text-center tracking-widest">Pareja A</p>
            <select className="w-full text-xs mb-2 bg-transparent outline-none" required onChange={e => setFormData({...formData, p1: e.target.value})}>
              <option value="">Jugador 1</option>
              {players.map(p => <option key={p.id} value={p.name}>{p.name} ({p.level})</option>)}
            </select>
            <select className="w-full text-xs bg-transparent outline-none" required onChange={e => setFormData({...formData, p2: e.target.value})}>
              <option value="">Jugador 2</option>
              {players.map(p => <option key={p.id} value={p.name}>{p.name} ({p.level})</option>)}
            </select>
          </div>

          <div className="bg-white p-4 rounded-[2rem] border-t-4 border-zinc-800 shadow-sm">
            <p className="text-[9px] font-black text-zinc-400 uppercase mb-3 text-center tracking-widest">Pareja B</p>
            <select className="w-full text-xs mb-2 bg-transparent outline-none" required onChange={e => setFormData({...formData, p3: e.target.value})}>
              <option value="">Jugador 3</option>
              {players.map(p => <option key={p.id} value={p.name}>{p.name} ({p.level})</option>)}
            </select>
            <select className="w-full text-xs bg-transparent outline-none" required onChange={e => setFormData({...formData, p4: e.target.value})}>
              <option value="">Jugador 4</option>
              {players.map(p => <option key={p.id} value={p.name}>{p.name} ({p.level})</option>)}
            </select>
          </div>
        </div>

        {/* Carga de Sets Minimalista */}
        <div className="bg-zinc-900 rounded-[2.5rem] p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <Trophy size={14} className="text-green-400" />
            <label className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Marcador por Sets</label>
          </div>
          
          <div className="space-y-4">
            {[ {s: set1, set: set1Set, n: "SET 1"}, {s: set2, set: set2Set, n: "SET 2"}, {s: set3, set: set3Set, n: "SET 3"} ].map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <span className="text-[9px] font-black text-zinc-600 w-10">{item.n}</span>
                <input 
                  type="number" placeholder="A" 
                  className="w-full bg-zinc-800 rounded-xl p-2 text-center text-green-400 font-mono font-bold outline-none border border-zinc-700 focus:border-green-500"
                  value={item.s.a} onChange={e => item.set({...item.s, a: e.target.value})}
                />
                <span className="text-zinc-700 font-black">-</span>
                <input 
                  type="number" placeholder="B" 
                  className="w-full bg-zinc-800 rounded-xl p-2 text-center text-green-400 font-mono font-bold outline-none border border-zinc-700 focus:border-green-500"
                  value={item.s.b} onChange={e => item.set({...item.s, b: e.target.value})}
                />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full bg-green-500 text-black p-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-green-500/20 active:scale-95 transition-transform">
          Guardar Partido
        </button>
      </form>
    </div>
  );
}
