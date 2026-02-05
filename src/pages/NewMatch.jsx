import { useState } from "react";
import { db } from "../db/database";
import { useLiveQuery } from "dexie-react-hooks";
import { Calendar, MapPin, Trophy, Users } from "lucide-react";

export default function NewMatch({ setPage }) {
  const players = useLiveQuery(() => db.players.toArray()) || [];
  
  const [formData, setFormData] = useState({
    club: "", 
    p1: "", 
    p2: "", 
    p3: "", 
    p4: "", 
    sets: "", 
    date: new Date().toISOString().split('T')[0] // Fecha de hoy por defecto
  });

  const saveMatch = async (e) => {
    e.preventDefault();
    if (!formData.p1 || !formData.p3) {
      alert("Por favor selecciona al menos un jugador por pareja");
      return;
    }
    
    await db.matches.add({
      ...formData,
      timestamp: new Date(formData.date).getTime()
    });
    
    setPage('history'); // Redirigir al historial tras guardar
  };

  return (
    <div className="p-4 pb-24 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-800">Nuevo Partido</h2>
        <p className="text-gray-500 text-sm">Registra el resultado del encuentro</p>
      </header>

      <form onSubmit={saveMatch} className="space-y-4">
        {/* Sección: Información General */}
        <div className="bg-white p-4 rounded-2xl shadow-sm space-y-3 border border-gray-100">
          <div className="flex items-center gap-2 border-b pb-2">
            <Calendar size={18} className="text-green-500" />
            <input 
              type="date"
              className="w-full outline-none text-sm font-medium"
              value={formData.date}
              required
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-green-500" />
            <input 
              className="w-full outline-none text-sm" 
              placeholder="Nombre del Club / Zona" 
              required
              value={formData.club}
              onChange={e => setFormData({...formData, club: e.target.value})}
            />
          </div>
        </div>

        {/* Sección: Parejas */}
        <div className="grid grid-cols-2 gap-4">
          {/* PAREJA A */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border-t-4 border-green-500">
            <p className="text-[10px] font-black text-green-600 uppercase mb-3 tracking-widest text-center">Pareja A</p>
            <div className="space-y-2">
              <select 
                className="w-full border-b py-2 text-xs outline-none bg-transparent" 
                required
                onChange={e => setFormData({...formData, p1: e.target.value})}
              >
                <option value="">Jugador 1</option>
                {players.map(p => <option key={p.id} value={p.name}>{p.name} ({p.level})</option>)}
              </select>
              <select 
                className="w-full border-b py-2 text-xs outline-none bg-transparent" 
                required
                onChange={e => setFormData({...formData, p2: e.target.value})}
              >
                <option value="">Jugador 2</option>
                {players.map(p => <option key={p.id} value={p.name}>{p.name} ({p.level})</option>)}
              </select>
            </div>
          </div>

          {/* PAREJA B */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border-t-4 border-zinc-800">
            <p className="text-[10px] font-black text-zinc-400 uppercase mb-3 tracking-widest text-center">Pareja B</p>
            <div className="space-y-2">
              <select 
                className="w-full border-b py-2 text-xs outline-none bg-transparent" 
                required
                onChange={e => setFormData({...formData, p3: e.target.value})}
              >
                <option value="">Jugador 3</option>
                {players.map(p => <option key={p.id} value={p.name}>{p.name} ({p.level})</option>)}
              </select>
              <select 
                className="w-full border-b py-2 text-xs outline-none bg-transparent" 
                required
                onChange={e => setFormData({...formData, p4: e.target.value})}
              >
                <option value="">Jugador 4</option>
                {players.map(p => <option key={p.id} value={p.name}>{p.name} ({p.level})</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Sección: Resultado */}
        <div className="bg-zinc-900 p-5 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={18} className="text-green-400" />
            <label className="text-white text-xs font-bold uppercase tracking-wider">Resultado Final</label>
          </div>
          <input 
            className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-green-400 font-mono text-center text-lg placeholder:text-zinc-600 outline-none focus:border-green-500 transition-all" 
            placeholder="6-4 / 3-6 / 10-8" 
            required
            value={formData.sets}
            onChange={e => setFormData({...formData, sets: e.target.value})}
          />
          <p className="text-[10px] text-zinc-500 mt-2 text-center italic">Tip: Usa el formato sets-sets / tiebreak</p>
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded-2xl font-bold shadow-xl shadow-green-200 transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          Finalizar y Guardar
        </button>
      </form>
    </div>
  );
}