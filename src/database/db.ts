import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('gympro.db');

export const initDatabase = () => {
    try {
        db.execSync(`
            CREATE TABLE IF NOT EXISTS routines (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                grupoMuscular TEXT NOT NULL,
                duracion INTEGER NOT NULL,
                featured INTEGER DEFULT 0
                );    
        `);
        console.log('Base de datos inicializada correctamente con SQLite.');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    }
}

export default db;