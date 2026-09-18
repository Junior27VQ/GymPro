import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//Navegacion en pila
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import DrawerNavigator from './src/navigators/DrawerNav';
import ChestDetailScreen from './src/screens/ChestDetailScreen';
import { RoutineProvider } from './src/context/RoutineContext';

export type RootStackParamList = { 
  MinDrawer: undefined,
  Detail: { id?: string | undefined }
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
          component={ChestDetailScreen}
          options={{title:'Detalles'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </RoutineProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
