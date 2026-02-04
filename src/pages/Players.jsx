import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/database";
import { UserPlus, User } from "lucide-react";

export default function Players() {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Intermedio");
  const players = useLiveQuery(() => db.players.toArray()) || [];

  const addPlayer = async (e) => {
    e.preventDefault();
    if (!name) return;
    await db.players.add({ name, level });
    setName("");
  };

  return (
    <div className="p-4 pb-24">
      <h2 className="text-xl font-bold mb-4 text-zinc-800">Gestionar Jugadores</h2>
      
      <form onSubmit={addPlayer} className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100">
        <div className="flex flex-col gap-3">
          <input 
            className="border p-2 rounded-lg outline-green-500"
            placeholder="Nombre del jugador"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select 
            className="border p-2 rounded-lg"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option>Principiante</option>
            <option>Intermedio</option>
            <option>Avanzado</option>
            <option>Pro</option>
          </select>
          <button className="bg-green-500 text-white p-2 rounded-lg font-bold flex justify-center items-center gap-2">
            <UserPlus size={18} /> Agregar Jugador
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {players.map(p => (
          <div key={p.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-zinc-100 p-2 rounded-full"><User size={16} /></div>
              <span className="font-medium">{p.name}</span>
            </div>
            <span className="text-xs bg-zinc-800 text-white px-2 py-1 rounded-full">{p.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
