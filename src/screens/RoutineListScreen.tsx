import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { TabParamList } from '../navigators/TabNavigator'; 
import { useRoutine } from '../context/RoutineContext';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Rutina'>,
  NativeStackScreenProps<RootStackParamList>
>;

const FILTROS = ['Todos', 'Pecho', 'Espalda', 'Piernas'];

export default function RoutineListScreen({ navigation }: Props) {
  const { routines, deleteRoutine, toggleFeatured } = useRoutine();
  const [filtroSeleccionado, setFiltroSeleccionado] = useState('Todos');

  // Lógica del filtro sobre las rutinas reales del Context API
  const rutinasFiltradas = routines.filter(item => {
    if (filtroSeleccionado === 'Todos') return true;
    return item.grupoMuscular.toLowerCase().includes(filtroSeleccionado.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header con título y botón de agregar */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Entrenamientos</Text>
          <Text style={styles.headerSubtitle}>Selecciona una rutina para hoy</Text>
        </View>
        <TouchableOpacity
          style={styles.addButtonHeader}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AddRoutine', { id: undefined })}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Contenedor de Filtros */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {FILTROS.map((filtro) => (
            <TouchableOpacity
              key={filtro}
              style={[
                styles.filterChip,
                filtroSeleccionado === filtro && styles.filterChipActive
              ]}
              onPress={() => setFiltroSeleccionado(filtro)}
            >
              <Text style={[
                styles.filterText,
                filtroSeleccionado === filtro && styles.filterTextActive
              ]}>
                {filtro}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={rutinasFiltradas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.card, item.featured && styles.cardFeatured]}>
            {/* Contenido principal de la rutina */}
            <View style={styles.cardContent}>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>{item.nombre}</Text>
                {item.featured && (
                  <View style={styles.badgeFeatured}>
                    <Ionicons name="star" size={12} color="#CA8A04" />
                    <Text style={styles.badgeText}>Destacada</Text>
                  </View>
                )}
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>⚡ {item.grupoMuscular}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.infoText}>⏱ {item.duracion} min</Text>
              </View>
            </View>

            {/* Botones de acción alineados a la derecha */}
            <View style={styles.actionButtonsContainer}>
              {/* Botón para marcar como destacada rápidamente */}
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => toggleFeatured(item.id)}
              >
                <Ionicons 
                  name={item.featured ? "star" : "star-outline"} 
                  size={20} 
                  color="#CA8A04" 
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => navigation.navigate('AddRoutine', { id: item.id })}
              >
                <Ionicons name="pencil" size={20} color="#F59E0B" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => navigation.navigate('Detail', { id: item.id })}
              >
                <Ionicons name="eye" size={20} color="#2563EB" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => deleteRoutine(item.id)}
              >
                <Ionicons name="trash" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  addButtonHeader: {
    backgroundColor: '#2563EB',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardFeatured: {
    borderColor: '#FACC15',
    backgroundColor: '#FEFCE8',
  },
  cardContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  badgeFeatured: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF08A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#854D0E',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 13,
    color: '#64748B',
  },
  dot: {
    marginHorizontal: 6,
    color: '#CBD5E1',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 10,
  },
  actionButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});