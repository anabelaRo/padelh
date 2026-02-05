import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/database";
import { shareMatch } from "../utils/share";
import { Share2, Trash2, Calendar, MapPin, Trophy } from "lucide-react";

export default function History() {
  const matches = useLiveQuery(() => db.matches.toArray()) || [];
  
  // Ordenamos: el más reciente arriba
  const sortedMatches = [...matches].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Lógica para determinar el ganador (idéntica al Dashboard para consistencia)
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

  const deleteMatch = async (id) => {
    if(confirm("¿Eliminar este registro?")) await db.matches.delete(id);
  };

  return (
    <div className="p-5 pb-24 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-black text-zinc-800 mb-6 uppercase tracking-tight">Historial</h2>

      {sortedMatches.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-zinc-200 rounded-[2rem] p-10 text-center text-zinc-400 text-xs font-bold uppercase tracking-widest">
          Sin registros
        </div>
      ) : (
        <div className="space-y-4">
          {sortedMatches.map((m) => {
            const winner = getWinner(m.sets);
            
            return (
              <div key={m.id} className="bg-white rounded-3xl p-5 shadow-sm border border-zinc-100">
                {/* Info superior */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-[9px] font-black text-zinc-300 uppercase tracking-widest">
                    <Calendar size={10} /> {m.date}
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-black text-green-500 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded">
                    <MapPin size={10} /> {m.club}
                  </div>
                </div>

                {/* Marcador Estilo Minimalista */}
                <div className="flex items-center justify-between gap-2">
                  {/* Pareja A */}
                  <div className={`flex-1 p-2 rounded-2xl transition-all ${winner === 'A' ? 'bg-zinc-50 border border-zinc-100 ring-1 ring-green-500/10' : 'opacity-40'}`}>
                    <p className={`text-[11px] leading-tight text-center ${winner === 'A' ? 'font-black text-zinc-900' : 'font-medium'}`}>
                      {m.p1} <br/> {m.p2}
                    </p>
                  </div>
                  
                  {/* Sets */}
                  <div className="px-3 flex flex-col items-center">
                    <span className="bg-zinc-900 text-green-400 px-3 py-1 rounded-xl font-mono font-black text-xs shadow-sm">
                      {m.sets}
                    </span>
                  </div>

                  {/* Pareja B */}
                  <div className={`flex-1 p-2 rounded-2xl transition-all ${winner === 'B' ? 'bg-zinc-50 border border-zinc-100 ring-1 ring-green-500/10' : 'opacity-40'}`}>
                    <p className={`text-[11px] leading-tight text-center ${winner === 'B' ? 'font-black text-zinc-900' : 'font-medium'}`}>
                      {m.p3} <br/> {m.p4}
                    </p>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex justify-end gap-6 mt-4 pt-3 border-t border-zinc-50">
                  <button onClick={() => shareMatch(m)} className="text-zinc-400 hover:text-green-500 transition-colors flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest">
                    <Share2 size={12} /> Compartir
                  </button>
                  <button onClick={() => deleteMatch(m.id)} className="text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest">
                    <Trash2 size={12} /> Borrar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}