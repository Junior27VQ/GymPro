import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo para simular rutinas de gimnasio
const RUTINAS = [
  { id: '1', titulo: 'Rutina de Pecho y Tríceps', duracion: '45 min', nivel: 'Intermedio', icono: 'barbell-outline' },
  { id: '2', titulo: 'Pierna y Glúteo Completo', duracion: '60 min', nivel: 'Avanzado', icono: 'fitness-outline' },
  { id: '3', titulo: 'Espalda y Bíceps', duracion: '50 min', nivel: 'Intermedio', icono: 'body-outline' },
  { id: '4', titulo: 'Hombro y Abdomen', duracion: '40 min', nivel: 'Principiante', icono: 'flash-outline' },
];

export default function RoutineListScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Entrenamientos</Text>
        <Text style={styles.headerSubtitle}>Selecciona una rutina para hoy</Text>
      </View>

      <FlatList
        data={RUTINAS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Detail', {rutina: item})}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={item.icono as any} size={28} color="#2563EB" />
            </View>
            
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>⏱ {item.duracion}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.infoText}>⚡ {item.nivel}</Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
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
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    // Sombra sutil para iOS y Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: { ios: 0.05, android: 0.1 } as any,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
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
});