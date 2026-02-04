import { useState } from "react";
import { db } from "../db/database";
import { useLiveQuery } from "dexie-react-hooks";

export default function NewMatch({ setPage }) {
  const players = useLiveQuery(() => db.players.toArray()) || [];
  const [formData, setFormData] = useState({
    club: "", p1: "", p2: "", p3: "", p4: "", sets: ""
  });

  const saveMatch = async (e) => {
    e.preventDefault();
    await db.matches.add({
      ...formData,
      date: new Date().toLocaleDateString(),
      timestamp: Date.now()
    });
    setPage('home');
  };

  return (
    <div className="p-4 pb-24">
      <h2 className="text-xl font-bold mb-4">Registrar Partido</h2>
      <form onSubmit={saveMatch} className="space-y-4">
        <input 
          className="w-full border p-3 rounded-xl" 
          placeholder="Club / Lugar" 
          required
          onChange={e => setFormData({...formData, club: e.target.value})}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-bold text-green-600">PAREJA A</p>
            <select className="w-full border p-2 rounded-lg text-sm" onChange={e => setFormData({...formData, p1: e.target.value})}>
              <option>Jugador 1</option>
              {players.map(p => <option key={p.id}>{p.name}</option>)}
            </select>
            <select className="w-full border p-2 rounded-lg text-sm" onChange={e => setFormData({...formData, p2: e.target.value})}>
              <option>Jugador 2</option>
              {players.map(p => <option key={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold text-zinc-400">PAREJA B</p>
            <select className="w-full border p-2 rounded-lg text-sm" onChange={e => setFormData({...formData, p3: e.target.value})}>
              <option>Jugador 3</option>
              {players.map(p => <option key={p.id}>{p.name}</option>)}
            </select>
            <select className="w-full border p-2 rounded-lg text-sm" onChange={e => setFormData({...formData, p4: e.target.value})}>
              <option>Jugador 4</option>
              {players.map(p => <option key={p.id}>{p.name}</option>)}
            </select>
          </div>
        </div>

        <div className="pt-4">
          <label className="text-sm font-medium">Resultado (sets)</label>
          <input 
            className="w-full border p-3 rounded-xl mt-1" 
            placeholder="Ej: 6-4 / 3-6 / 10-8" 
            required
            onChange={e => setFormData({...formData, sets: e.target.value})}
          />
        </div>

        <button type="submit" className="w-full bg-green-500 text-white p-4 rounded-xl font-bold shadow-lg shadow-green-200">
          Guardar Partido
        </button>
      </form>
    </div>
  );
}
