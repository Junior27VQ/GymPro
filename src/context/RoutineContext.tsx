import React, { createContext, useState, useContext, ReactNode } from "react";

export type Routine = {
    id: string;
    name: string;
    muscleGroup: string;
    duration: number;
    createdAt: string;
}

type RoutineContextType = {
    routines: Routine[]
    addRoutine: (routine: Omit<Routine, 'id' | 'createdAt'>)=> void;
    updateRoutine: (id: string, routine: Omit<Routine, 'id' | 'createdAt'>)=> void;
    deleteRoutine: (id: string)=> void;
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export function RoutineProvider({children}: {children: ReactNode}) {
    const [routines, setRoutines] = useState<Routine[]>([
        { id: '1', name: 'Rutina de Pecho y Tríceps', muscleGroup: 'Pecho y Tríceps', duration: 45, createdAt: new Date().toLocaleDateString() },
        { id: '2', name: 'Pierna y Glúteo Completo', muscleGroup: 'Piernas', duration: 60, createdAt: new Date().toLocaleDateString() },
        { id: '3', name: 'Espalda y Bíceps', muscleGroup: 'Espalda y Bíceps', duration: 50, createdAt: new Date().toLocaleDateString() },
        { id: '4', name: 'Hombro y Abdomen', muscleGroup: 'Hombro y Abdomen', duration: 40, createdAt: new Date().toLocaleDateString() },
    ]);

    const addRoutine = (routine: Omit<Routine, 'id' | 'createdAt'>)=> {
        const newRoutine = {
            ...routine,
            id: Date.now().toString(),
            createdAt: new Date().toLocaleDateString()
        }
        setRoutines([...routines, newRoutine]);
    };
    const updateRoutine = (id: string, routine: Omit<Routine, 'id' | 'createdAt'>)=> {
        setRoutines(routines.map( p=> p.id === id ? {...p, ...routine}: p));
    };
    const deleteRoutine = (id: string)=> {
        setRoutines(routines.filter(p=> p.id !== id));
    };

    return(
        <RoutineContext.Provider value={{routines, addRoutine, updateRoutine, deleteRoutine}}>
            {children}
        </RoutineContext.Provider>
    );
}

export function useRoutine(){
    const context = useContext(RoutineContext);
    if(!context) throw new Error('useRoutine debe ser usado dentro de un RoutineProvider.');
    return context;
}