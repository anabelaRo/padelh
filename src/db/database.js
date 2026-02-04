// src/db/database.js
import Dexie from 'dexie';

export const db = new Dexie('PadelDB');
db.version(1).stores({
  players: '++id, name, level',
  matches: '++id, date, player1, player2, player3, player4, club'
});
