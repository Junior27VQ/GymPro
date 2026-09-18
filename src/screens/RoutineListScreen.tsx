import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

// IMPORTAMOS el tipo directamente desde el TabNavigator para no repetirlo
import { TabParamList } from '../navigators/TabNavigator'; 
import { useRoutine } from '../context/RoutineContext';

// Creamos el tipado compuesto oficial usando el tipo importado
type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Rutina'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function RoutineListScreen({ navigation }: Props) {
  const { routines, deleteRoutine } = useRoutine();

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

      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Contenido principal de la rutina */}
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>⚡ {item.muscleGroup}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.infoText}>⏱ {item.duration} min</Text>
              </View>
            </View>

            {/* Botones de acción alineados a la derecha */}
            <View style={styles.actionButtonsContainer}>
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
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 10,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});