import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import db, { initDatabase } from "../database/db"; // Importamos la conexión y el inicializador del modelo

export type Routine = {
    id: number;
    nombre: string;
    grupoMuscular: string;
    duracion: number;
    featured: boolean;
}

type RoutineContextType = {
    routines: Routine[];
    addRoutine: (routine: Omit<Routine, 'id'>) => void;
    updateRoutine: (id: number, routine: Partial<Routine>) => void;
    deleteRoutine: (id: number) => void;
    toggleFeatured: (id: number) => void;
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export function RoutineProvider({ children }: { children: ReactNode }) {
    const [routines, setRoutines] = useState<Routine[]>([]);

    // Al iniciar el Provider, inicializamos la BD y cargamos los datos
    useEffect(() => {
        initDatabase();
        loadRoutines();
    }, []);

    // Función interna para consultar SQLite y actualizar el estado
    const loadRoutines = () => {
        try {
            const result = db.getAllSync('SELECT * FROM routines') as any[];
            const formatted: Routine[] = result.map(item => ({
                id: item.id,
                nombre: item.nombre,
                grupoMuscular: item.grupoMuscular,
                duracion: item.duracion,
                featured: item.featured === 1 
            }));
            setRoutines(formatted);
        } catch (error) {
            console.error('Error al cargar rutinas:', error);
        }
    };

    // CREATE: Agregar rutina y guardar en SQLite
    const addRoutine = (routineData: Omit<Routine, 'id'>) => {
        try {
            // Regla: Si se marca como destacada, las demás pasan a false
            if (routineData.featured) {
                db.runSync('UPDATE routines SET featured = 0');
            }

            db.runSync(
                'INSERT INTO routines (nombre, grupoMuscular, duracion, featured) VALUES (?, ?, ?, ?)',
                [routineData.nombre, routineData.grupoMuscular, routineData.duracion, routineData.featured ? 1 : 0]
            );
            loadRoutines(); // Recargamos el estado
        } catch (error) {
            console.error('Error al agregar rutina:', error);
        }
    };

    // UPDATE: Modificar rutina existente
    const updateRoutine = (id: number, routineData: Partial<Routine>) => {
        try {
            const existing = routines.find(r => r.id === id);
            if (!existing) return;

            const nombre = routineData.nombre !== undefined ? routineData.nombre : existing.nombre;
            const grupoMuscular = routineData.grupoMuscular !== undefined ? routineData.grupoMuscular : existing.grupoMuscular;
            const duracion = routineData.duracion !== undefined ? routineData.duracion : existing.duracion;
            const featured = routineData.featured !== undefined ? routineData.featured : existing.featured;

            if (featured) {
                db.runSync('UPDATE routines SET featured = 0');
            }

            db.runSync(
                'UPDATE routines SET nombre = ?, grupoMuscular = ?, duracion = ?, featured = ? WHERE id = ?',
                [nombre, grupoMuscular, duracion, featured ? 1 : 0, id]
            );
            loadRoutines();
        } catch (error) {
            console.error('Error al actualizar rutina:', error);
        }
    };

    // DELETE: Eliminar rutina por ID
    const deleteRoutine = (id: number) => {
        try {
            db.runSync('DELETE FROM routines WHERE id = ?', [id]);
            loadRoutines();
        } catch (error) {
            console.error('Error al eliminar rutina:', error);
        }
    };

    // TOGGLE FEATURED: Asegurar que solo una rutina sea destacada a la vez
    const toggleFeatured = (id: number) => {
        try {
            const target = routines.find(r => r.id === id);
            if (!target) return;

            const newState = !target.featured;

            if (newState) {
                db.runSync('UPDATE routines SET featured = 0');
                db.runSync('UPDATE routines SET featured = 1 WHERE id = ?', [id]);
            } else {
                db.runSync('UPDATE routines SET featured = 0 WHERE id = ?', [id]);
            }
            loadRoutines();
        } catch (error) {
            console.error('Error al cambiar destacado:', error);
        }
    };

    return (
        <RoutineContext.Provider value={{ routines, addRoutine, updateRoutine, deleteRoutine, toggleFeatured }}>
            {children}
        </RoutineContext.Provider>
    );
}

export function useRoutine() {
    const context = useContext(RoutineContext);
    if (!context) throw new Error('useRoutine debe ser usado dentro de un RoutineProvider.');
    return context;
}