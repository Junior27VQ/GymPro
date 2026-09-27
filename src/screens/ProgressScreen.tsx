import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutine } from '../context/RoutineContext';

export default function ProgressScreen() {
  const { routines } = useRoutine();

  // Total de rutinas
  const totalRutinas = routines.length;
  
  // Duración total y promedio
  const minutosTotales = routines.reduce((acc, curr) => acc + (Number(curr.duracion) || 0), 0);
  const duracionPromedio = totalRutinas > 0 ? Math.round(minutosTotales / totalRutinas) : 0;

  // Grupo muscular con mayor cantidad de rutinas
  let grupoFrecuente = 'Ninguno';
  if (totalRutinas > 0) {
    const conteoGrupos: { [key: string]: number } = {};
    routines.forEach(r => {
      const grupo = r.grupoMuscular ? r.grupoMuscular.trim() : 'General';
      conteoGrupos[grupo] = (conteoGrupos[grupo] || 0) + 1;
    });

    let maxCount = 0;
    for (const [grupo, count] of Object.entries(conteoGrupos)) {
      if (count > maxCount) {
        maxCount = count;
        grupoFrecuente = grupo;
      }
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Tu Progreso</Text>
          <Text style={styles.headerSubtitle}>Resumen analítico basado en tu base de datos SQLite</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="barbell-outline" size={24} color="#2563EB" />
            </View>
            <Text style={styles.statValue}>{totalRutinas}</Text>
            <Text style={styles.statLabel}>Total de Rutinas</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#F0FDF4' }]}>
              <Ionicons name="time-outline" size={24} color="#16A34A" />
            </View>
            <Text style={styles.statValue}>{minutosTotales} min</Text>
            <Text style={styles.statLabel}>Duración Total</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#FEF2F2' }]}>
              <Ionicons name="stats-chart-outline" size={24} color="#DC2626" />
            </View>
            <Text style={styles.statValue}>{duracionPromedio} min</Text>
            <Text style={styles.statLabel}>Duración Promedio</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#FAF5FF' }]}>
              <Ionicons name="trophy-outline" size={24} color="#9333EA" />
            </View>
            <Text style={styles.statValue} numberOfLines={1}>{grupoFrecuente}</Text>
            <Text style={styles.statLabel}>Grupo Principal</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Historial y Persistencia (SQLite)</Text>

        {routines.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay rutinas registradas aún. Agrega una para ver el resumen.</Text>
          </View>
        ) : (
          routines.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <View style={styles.historyLeft}>
                <View style={styles.calendarIconContainer}>
                  <Ionicons name="fitness" size={20} color="#64748B" />
                </View>
                <View>
                  <Text style={styles.historyDate}>{item.nombre}</Text>
                  <Text style={styles.historySubText}>Enfoque: {item.grupoMuscular}</Text>
                </View>
              </View>

              <View style={styles.historyRight}>
                <Text style={styles.historyWeight}>{item.duracion} min</Text>
                <View style={[
                  styles.badgeChange, 
                  { backgroundColor: item.featured ? '#FEF08A' : '#F1F5F9' }
                ]}>
                  <Text style={[
                    styles.badgeText, 
                    { color: item.featured ? '#854D0E' : '#64748B' }
                  ]}>
                    {item.featured ? 'Destacada' : 'Normal'}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContainer: {
    padding: 16,
  },
  headerTitleContainer: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  calendarIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  historySubText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 1,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyWeight: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  badgeChange: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
  },
});