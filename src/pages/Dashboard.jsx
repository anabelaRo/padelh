// src/pages/Dashboard.jsx
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/database";
import { Trophy, Users, Calendar } from "lucide-react";

export default function Dashboard() {
  const matches = useLiveQuery(() => db.matches.toArray()) || [];
  const players = useLiveQuery(() => db.players.toArray()) || [];

  const totalMatches = matches.length;
  const lastMatch = matches[matches.length - 1];

  return (
    <div className="p-4 pb-24 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mi Padel App</h1>
        <p className="text-gray-500 text-sm">Resumen de actividad</p>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-green-500 p-4 rounded-2xl text-white shadow-lg">
          <Trophy className="mb-2" />
          <div className="text-2xl font-bold">{totalMatches}</div>
          <div className="text-xs opacity-80">Partidos Totales</div>
        </div>
        <div className="bg-zinc-800 p-4 rounded-2xl text-white shadow-lg">
          <Users className="mb-2" />
          <div className="text-2xl font-bold">{players.length}</div>
          <div className="text-xs opacity-80">Jugadores</div>
        </div>
      </div>

      <h3 className="font-bold mb-4 text-gray-700">Último Resultado</h3>
      {lastMatch ? (
        <div className="bg-white p-4 rounded-xl border-l-4 border-green-500 shadow-sm">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>{lastMatch.date}</span>
            <span>{lastMatch.club}</span>
          </div>
          <div className="flex justify-around items-center">
            <div className="text-center font-semibold">{lastMatch.p1} / {lastMatch.p2}</div>
            <div className="bg-gray-100 px-3 py-1 rounded text-green-600 font-bold">
              {lastMatch.sets}
            </div>
            <div className="text-center font-semibold">{lastMatch.p3} / {lastMatch.p4}</div>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-center italic">No hay partidos registrados aún.</p>
      )}
    </div>
  );
}
