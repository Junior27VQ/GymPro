import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutine } from '../context/RoutineContext';

export default function ProgressScreen() {
  const { routines } = useRoutine();

  const totalRutinas = routines.length;
  const minutosTotales = routines.reduce((acc, curr) => acc + (Number(curr.duracion) || 0), 0);
  const duracionPromedio = totalRutinas > 0 ? Math.round(minutosTotales / totalRutinas) : 0;

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
        
        {/* Header Minimalista */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Progreso</Text>
          <Text style={styles.headerSubtitle}>Resumen analítico de tus entrenamientos</Text>
        </View>

        {/* Tarjetas de Estadísticas (Grid 2x2 Minimalista) */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="barbell-outline" size={20} color="#2563EB" />
            </View>
            <Text style={styles.statValue}>{totalRutinas}</Text>
            <Text style={styles.statLabel}>Rutinas Totales</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="time-outline" size={20} color="#16A34A" />
            </View>
            <Text style={styles.statValue}>{minutosTotales}m</Text>
            <Text style={styles.statLabel}>Tiempo Invertido</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="stats-chart-outline" size={20} color="#D97706" />
            </View>
            <Text style={styles.statValue}>{duracionPromedio}m</Text>
            <Text style={styles.statLabel}>Media / Rutina</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="trophy-outline" size={20} color="#7C3AED" />
            </View>
            <Text style={styles.statValue} numberOfLines={1}>{grupoFrecuente}</Text>
            <Text style={styles.statLabel}>Enfoque Top</Text>
          </View>
        </View>

        {/* Historial / Listado SQLite */}
        <Text style={styles.sectionTitle}>Historial de SQLite</Text>

        {routines.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open-outline" size={40} color="#CBD5E1" />
            <Text style={styles.emptyText}>No hay registros disponibles todavía.</Text>
          </View>
        ) : (
          routines.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <View style={styles.historyLeft}>
                <View style={styles.iconBox}>
                  <Ionicons name="fitness" size={18} color="#475569" />
                </View>
                <View>
                  <Text style={styles.historyName}>{item.nombre}</Text>
                  <Text style={styles.historySub}>{item.grupoMuscular}</Text>
                </View>
              </View>

              <View style={styles.historyRight}>
                <Text style={styles.historyWeight}>{item.duracion} min</Text>
                {item.featured && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Destacada</Text>
                  </View>
                )}
              </View>
            </View>
          ))
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContainer: { padding: 20 },
  headerContainer: { marginBottom: 24 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#0F172A', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 13, color: '#64748B', marginTop: 4 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 28 },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  statIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  statLabel: { fontSize: 12, color: '#64748B', marginTop: 2, fontWeight: '500' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 14 },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  historyLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyName: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  historySub: { fontSize: 12, color: '#94A3B8', marginTop: 1 },
  historyRight: { alignItems: 'flex-end' },
  historyWeight: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  badge: { backgroundColor: '#FEF3C7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#B45309' },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { color: '#94A3B8', fontSize: 13, marginTop: 8 },
});