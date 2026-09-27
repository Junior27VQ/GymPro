import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useRoutine } from "../context/RoutineContext";

export default function AddRoutineScreen({ navigation, route }: any) {
    const { routines, addRoutine, updateRoutine } = useRoutine();
    
    // Convertimos el parámetro de la ruta a número de manera segura
    const idToEdit = route.params?.id ? Number(route.params.id) : undefined;
    
    const [nombre, setNombre] = useState('');
    const [grupoMuscular, setGrupoMuscular] = useState('');
    const [durationString, setDurationString] = useState('');
    
    useEffect(() => {
        if (idToEdit) {
            const routineFound = routines.find(p => p.id === idToEdit);
            if (routineFound) {                
                setNombre(routineFound.nombre);
                setGrupoMuscular(routineFound.grupoMuscular);
                setDurationString(routineFound.duracion.toString());
            }
        }
    }, [idToEdit, routines]);

    const handleSave = () => {
        // Validar que los campos obligatorios no estén vacíos
        if (!nombre.trim() || !grupoMuscular.trim() || !durationString.trim()) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        // Validar que la duración sea un número válido
        const duracionNumber = Number(durationString);
        if (isNaN(duracionNumber)) {
            Alert.alert('Error', 'La duración debe ser un número válido');
            return; 
        }

        // Validar que la duración esté estrictamente entre 10 y 180 minutos
        if (duracionNumber < 10 || duracionNumber > 180) {
            Alert.alert('Error de validación', 'La duración de la rutina debe estar entre 10 y 180 minutos.');
            return;
        }

        if (idToEdit) {
            updateRoutine(idToEdit, { nombre, grupoMuscular, duracion: duracionNumber });
        } else {
            addRoutine({ nombre, grupoMuscular, duracion: duracionNumber, featured: false });
        }
        
        navigation.goBack();
    };

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formCard}>
                <Text style={styles.label}>Nombre de la Rutina</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Ej. Pecho y Tríceps Intenso"
                    placeholderTextColor="#94A3B8"
                    value={nombre}
                    onChangeText={setNombre}
                />

                <Text style={styles.label}>Grupo Muscular</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Ej. Pecho, Tríceps, Piernas..."
                    placeholderTextColor="#94A3B8"
                    value={grupoMuscular}
                    onChangeText={setGrupoMuscular}
                />

                <Text style={styles.label}>Duración (minutos)</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Ej. 45"
                    placeholderTextColor="#94A3B8"
                    value={durationString}
                    onChangeText={setDurationString}
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.saveButton} activeOpacity={0.8} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>
                        {idToEdit ? 'Actualizar Rutina' : 'Guardar Rutina'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F8FAFC',
        padding: 20,
        justifyContent: 'center',
    },
    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: '#0F172A',
    },
    saveButton: {
        backgroundColor: '#2563EB',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 24,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});