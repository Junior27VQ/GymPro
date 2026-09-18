import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useRoutine } from '../context/RoutineContext';

// Base de datos de ejercicios detallados para cada rutina según su ID
const DETALLES_RUTINAS: Record<string, Array<{ id: string; nombre: string; series: string; repeticiones: string; descanso: string }>> = {
  '1': [ // Pecho y Tríceps
    { id: '1', nombre: 'Press de Banca Plano con Barra', series: '4 series', repeticiones: '8 - 10 reps', descanso: '90 seg' },
    { id: '2', nombre: 'Press Inclinado con Mancuernas', series: '4 series', repeticiones: '10 - 12 reps', descanso: '60 seg' },
    { id: '3', nombre: 'Aperturas en Polea Baja', series: '3 series', repeticiones: '12 - 15 reps', descanso: '60 seg' },
    { id: '4', nombre: 'Fondos en Paralelas (Dips)', series: '3 series', repeticiones: 'Al fallo', descanso: '90 seg' },
  ],
  '2': [ // Pierna y Glúteo Completo
    { id: '1', nombre: 'Sentadilla Libre con Barra', series: '4 series', repeticiones: '6 - 8 reps', descanso: '120 seg' },
    { id: '2', nombre: 'Prensa Inclinada', series: '4 series', repeticiones: '10 - 12 reps', descanso: '90 seg' },
    { id: '3', nombre: 'Peso Muerto Rumano', series: '3 series', repeticiones: '10 reps', descanso: '90 seg' },
    { id: '4', nombre: 'Extensiones de Cuádriceps', series: '3 series', repeticiones: '15 reps', descanso: '60 seg' },
  ],
  '3': [ // Espalda y Bíceps
    { id: '1', nombre: 'Dominadas o Jalón al Pecho', series: '4 series', repeticiones: '8 - 10 reps', descanso: '90 seg' },
    { id: '2', nombre: 'Remo con Barra en T', series: '4 series', repeticiones: '8 - 10 reps', descanso: '90 seg' },
    { id: '3', nombre: 'Remo Unilateral con Mancuerna', series: '3 series', repeticiones: '12 reps', descanso: '60 seg' },
    { id: '4', nombre: 'Curl de Bíceps con Barra Z', series: '3 series', repeticiones: '10 - 12 reps', descanso: '60 seg' },
  ],
  '4': [ // Hombro y Abdomen
    { id: '1', nombre: 'Press Militar con Barra', series: '4 series', repeticiones: '8 - 10 reps', descanso: '90 seg' },
    { id: '2', nombre: 'Elevaciones Laterales con Mancuernas', series: '4 series', repeticiones: '12 - 15 reps', descanso: '60 seg' },
    { id: '3', nombre: 'Encogimientos de Hombro (Trapecio)', series: '3 series', repeticiones: '12 reps', descanso: '60 seg' },
    { id: '4', nombre: 'Elevación de Piernas Colgado', series: '3 series', repeticiones: 'Al fallo', descanso: '45 seg' },
  ]
};
// Definimos el tipo exacto para las props de esta pantalla
type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function ChestDetailScreen({ route }: Props) {
  const idToView = route.params?.id;
  const {routines} = useRoutine();
  // Recibimos los datos de la rutina seleccionada (con valores por defecto por seguridad)
  const rutinaSeleccionada = routines.find(p=> p.id === idToView);
  if(!routines) return <Text>Producto no encontrado</Text>

  // Obtenemos los ejercicios correspondientes al ID de la rutina (si no existe, muestra pecho por defecto)
  const listaEjercicios = DETALLES_RUTINAS['1'];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Banner Superior Dinámico con la información de la rutina seleccionada */}
        <View style={styles.banner}>
          <View style={styles.iconContainer}>
            <Ionicons id={rutinaSeleccionada?.name || 'barbell'} size={32} color="#2563EB" />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>⚡{rutinaSeleccionada?.muscleGroup}</Text>
            <View style={styles.bannerSubRow}>
              <Text style={styles.bannerSubtitle}>⏱ {rutinaSeleccionada?.duration}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.bannerSubtitle}>{rutinaSeleccionada?.createdAt}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ejercicios de la Sesión</Text>

        {/* Tarjetas de Ejercicios dinámicos */}
        {listaEjercicios.map((item, index) => (
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  bannerSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  dot: {
    marginHorizontal: 6,
    color: '#CBD5E1',
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