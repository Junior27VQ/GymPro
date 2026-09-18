//Navegacion en pila
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import DrawerNavigator from './src/navigators/DrawerNav';
import RoutineDetailScreen from './src/screens/RoutineDetailScreen';
import { RoutineProvider } from './src/context/RoutineContext';
import AddRoutineScreen from './src/screens/AddRoutineScreen';

export type RootStackParamList = { 
  MinDrawer: undefined,
  Detail: { id?: string },
  AddRoutine: {id?: string }
}
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <RoutineProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName='MinDrawer'>
        <Stack.Screen
          name='MinDrawer'
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='Detail'
          component={RoutineDetailScreen}
          options={{title:'Detalles'}}
        />
        <Stack.Screen
          name='AddRoutine'
          component={AddRoutineScreen}
          options={({route})=> ({
                title: route.params?.id ? 'Editar Rutina' : 'Nuevo Rutina'
              })}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </RoutineProvider>
  );
}
