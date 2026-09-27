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
    return item.grupoMuscular?.toLowerCase().includes(filtroSeleccionado.toLowerCase());
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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="barbell-outline" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>No hay rutinas en esta categoría.</Text>
          </View>
        }
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

            {/* Botones de acción */}
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => toggleFeatured(item.id)}
              >
                <Ionicons 
                  name={item.featured ? "star" : "star-outline"} 
                  size={18} 
                  color="#CA8A04" 
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => navigation.navigate('AddRoutine', { id: item.id })}
              >
                <Ionicons name="pencil" size={18} color="#F59E0B" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => navigation.navigate('Detail', { id: item.id })}
              >
                <Ionicons name="eye" size={18} color="#2563EB" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => deleteRoutine(item.id)}
              >
                <Ionicons name="trash" size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerTextContainer: { flex: 1 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#0F172A', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },
  addButtonHeader: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#2563EB', justifyContent: 'center', alignItems: 'center', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 },
  filterContainer: { marginBottom: 12 },
  filterScroll: { paddingHorizontal: 20, gap: 8 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', marginRight: 8 },
  filterChipActive: { backgroundColor: '#0F172A', borderColor: '#0F172A' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  filterTextActive: { color: '#FFFFFF' },
  listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 6, elevation: 1 },
  cardFeatured: { borderColor: '#FDE047', backgroundColor: '#FEFCE8' },
  cardContent: { marginBottom: 12 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', flex: 1 },
  badgeFeatured: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, gap: 4 },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#B45309' },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoText: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  dot: { color: '#CBD5E1' },
  actionButtonsContainer: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  actionButton: { width: 34, height: 34, borderRadius: 8, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { color: '#94A3B8', fontSize: 13, marginTop: 8 },
});