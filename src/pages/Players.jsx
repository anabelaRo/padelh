import { useState } from "react";
import { db } from "../db/database";
import { useLiveQuery } from "dexie-react-hooks";
import { UserPlus, Trash2, Award } from "lucide-react";

export default function Players() {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("7ma"); // Categoría por defecto
  const players = useLiveQuery(() => db.players.toArray()) || [];

  const addPlayer = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await db.players.add({ name, level });
    setName("");
  };

  const deletePlayer = async (id) => {
    if(confirm("¿Eliminar jugador?")) await db.players.delete(id);
  };

  return (
    <div className="p-5 pb-24 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-black text-zinc-800 mb-6 uppercase tracking-tight">Jugadores</h2>

      {/* Formulario para agregar */}
      <form onSubmit={addPlayer} className="bg-white p-5 rounded-[2rem] shadow-sm border border-zinc-100 mb-8 space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-zinc-400 uppercase ml-1">Nombre</label>
          <input 
            className="w-full bg-gray-50 border-none p-3 rounded-xl text-sm outline-none focus:ring-2 ring-green-500/20 transition-all"
            placeholder="Ej: Ana Rossi"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-zinc-400 uppercase ml-1">Categoría</label>
          <select 
            className="w-full bg-gray-50 border-none p-3 rounded-xl text-sm outline-none appearance-none"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="8va">8va Categoría</option>
            <option value="7ma">7ma Categoría</option>
            <option value="6ta">6ta Categoría</option>
            <option value="5ta">5ta Categoría</option>
            <option value="4ta">4ta Categoría</option>
            <option value="3ra">3ra Categoría</option>
            <option value="2da">2da Categoría</option>
            <option value="1era">1era Categoría</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-zinc-900 text-white p-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <UserPlus size={16} /> Agregar Jugador
        </button>
      </form>

      {/* Listado de jugadores */}
      <div className="space-y-3">
        {players.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-zinc-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                <Award size={20} />
              </div>
              <div>
                <p className="font-bold text-zinc-800 text-sm">{p.name}</p>
                {/* Aquí es donde se muestra la categoría */}
                <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">
                  {p.level}
                </p>
              </div>
            </div>
            <button onClick={() => deletePlayer(p.id)} className="text-zinc-300 hover:text-red-500 transition-colors p-2">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
