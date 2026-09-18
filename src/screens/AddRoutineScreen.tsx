import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useRoutine } from "../context/RoutineContext";

export default function AddRoutineScreen({ navigation, route }: any) {
    const { routines, addRoutine, updateRoutine } = useRoutine();
    const idToEdit = route.params?.id;
    
    const [name, setName] = useState('');
    const [muscleGroup, setMuscleGroup] = useState('');
    const [durationString, setDurationString] = useState('');
    
    useEffect(() => {
        if (idToEdit) {
            const routineFound = routines.find(p => p.id === idToEdit);
            if (routineFound) {                    
                setName(routineFound.name);
                setMuscleGroup(routineFound.muscleGroup);
                setDurationString(routineFound.duration.toString());
            }
        }
    }, [idToEdit]);

    const handleSave = () => {
        if (!name || !durationString) {
            Alert.alert('Error', 'Faltan datos requeridos');
            return;
        }
        const durationNumber = parseFloat(durationString);
        if (isNaN(durationNumber)) {
            Alert.alert('Error', 'La duración debe ser un número válido');
            return; 
        }
        if (idToEdit) {
            updateRoutine(idToEdit, { name, muscleGroup, duration: durationNumber });
        } else {
            addRoutine({ name, muscleGroup, duration: durationNumber });
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
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Grupo Muscular</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Ej. Pecho, Tríceps, Piernas..."
                    placeholderTextColor="#94A3B8"
                    value={muscleGroup}
                    onChangeText={setMuscleGroup}
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