import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Lista de ejercicios detallados para la rutina de pecho
const EJERCICIOS_PECHO = [
  { id: '1', nombre: 'Press de Banca Plano con Barra', series: '4 series', repeticiones: '8 - 10 reps', descanso: '90 seg' },
  { id: '2', nombre: 'Press Inclinado con Mancuernas', series: '4 series', repeticiones: '10 - 12 reps', descanso: '60 seg' },
  { id: '3', nombre: 'Aperturas en Polea Baja', series: '3 series', repeticiones: '12 - 15 reps', descanso: '60 seg' },
  { id: '4', nombre: 'Fondos en Paralelas (Dips)', series: '3 series', repeticiones: 'Al fallo', descanso: '90 seg' },
  { id: '5', nombre: 'Press declinado en máquina', series: '3 series', repeticiones: '12 reps', descanso: '60 seg' },
];

export default function ChestDetailScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Banner Superior Informativo */}
        <View style={styles.banner}>
          <View style={styles.iconContainer}>
            <Ionicons name="barbell" size={32} color="#2563EB" />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Rutina de Pecho y Tríceps</Text>
            <Text style={styles.bannerSubtitle}>Enfoque en hipertrofia, fuerza y definición</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ejercicios de la Sesión</Text>

        {/* Tarjetas de Ejercicios */}
        {EJERCICIOS_PECHO.map((item, index) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.exerciseNumber}>#{index + 1}</Text>
              <Text style={styles.exerciseName}>{item.nombre}</Text>
            </View>
            
            <View style={styles.detailsRow}>
              <View style={styles.detailBadge}>
                <Ionicons name="repeat-outline" size={14} color="#64748B" />
                <Text style={styles.detailText}>{item.series}</Text>
              </View>
              <View style={styles.detailBadge}>
                <Ionicons name="fitness-outline" size={14} color="#64748B" />
                <Text style={styles.detailText}>{item.repeticiones}</Text>
              </View>
              <View style={styles.detailBadge}>
                <Ionicons name="time-outline" size={14} color="#64748B" />
                <Text style={styles.detailText}>{item.descanso}</Text>
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
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTextContainer: {
    marginLeft: 14,
    flex: 1,
  },
  bannerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  bannerSubtitle: {
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563EB',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 10,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  detailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
});