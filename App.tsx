import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//Navegacion en pila
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import DrawerNavigator from './src/navigators/DrawerNav';
import ChestDetailScreen from './src/screens/ChestDetailScreen';

export type RootStackParamList = { 
  MinDarwer: undefined,
  Detail: undefined
}
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MinDarwer'>
        <Stack.Screen
          name='MinDarwer'
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
