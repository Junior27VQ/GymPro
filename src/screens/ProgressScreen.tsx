import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo para el historial de progreso
const HISTORIAL_PESO = [
  { id: '1', fecha: '10 Sep 2026', peso: '78.5 kg', cambio: '-0.5 kg', estado: 'down' },
  { id: '2', fecha: '03 Sep 2026', peso: '79.0 kg', cambio: '-0.2 kg', estado: 'down' },
  { id: '3', fecha: '27 Ago 2026', peso: '79.2 kg', cambio: '+0.1 kg', estado: 'up' },
  { id: '4', fecha: '20 Ago 2026', peso: '79.1 kg', cambio: '-0.8 kg', estado: 'down' },
];

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Título de la sección */}
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Tu Progreso</Text>
          <Text style={styles.headerSubtitle}>Monitorea tus cambios físicos y metas</Text>
        </View>

        {/* Tarjetas de Estadísticas Principales (Grid 2x2) */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="scale-outline" size={24} color="#2563EB" />
            </View>
            <Text style={styles.statValue}>78.5 kg</Text>
            <Text style={styles.statLabel}>Peso Actual</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#F0FDF4' }]}>
              <Ionicons name="flame-outline" size={24} color="#16A34A" />
            </View>
            <Text style={styles.statValue}>15.2%</Text>
            <Text style={styles.statLabel}>Grasa Corporal</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#FEF2F2' }]}>
              <Ionicons name="trending-down" size={24} color="#DC2626" />
            </View>
            <Text style={styles.statValue}>-3.5 kg</Text>
            <Text style={styles.statLabel}>Meta Alcanzada</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#FAF5FF' }]}>
              <Ionicons name="fitness-outline" size={24} color="#9333EA" />
            </View>
            <Text style={styles.statValue}>18 Días</Text>
            <Text style={styles.statLabel}>Constancia</Text>
          </View>
        </View>

        {/* Sección de Historial */}
        <Text style={styles.sectionTitle}>Historial de Peso</Text>

        {HISTORIAL_PESO.map((item) => (
          <View key={item.id} style={styles.historyCard}>
            <View style={styles.historyLeft}>
              <View style={styles.calendarIconContainer}>
                <Ionicons name="calendar-outline" size={20} color="#64748B" />
              </View>
              <View>
                <Text style={styles.historyDate}>{item.fecha}</Text>
                <Text style={styles.historySubText}>Registro semanal</Text>
              </View>
            </View>

            <View style={styles.historyRight}>
              <Text style={styles.historyWeight}>{item.peso}</Text>
              <View style={[
                styles.badgeChange, 
                { backgroundColor: item.estado === 'down' ? '#F0FDF4' : '#FEF2F2' }
              ]}>
                <Text style={[
                  styles.badgeText, 
                  { color: item.estado === 'down' ? '#16A34A' : '#DC2626' }
                ]}>
                  {item.cambio}
                </Text>
              </View>
            </View>
          </View>
        ))}

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
});