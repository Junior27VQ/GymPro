import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ProgressScreen from "../screens/ProgressScreen";
import RoutineListScreen from "../screens/RoutineListScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return (
        <Tab.Navigator screenOptions={({route})=> ({
          headerShown: false,
          tabBarIcon: ({focused, color, size})=> {
            let IonName: any = 'List';
            if(route.name === 'Progreso'){
              IonName = focused? 'bonfire' : 'bonfire-outline'
            } else if(route.name === 'Rutina'){
              IonName = focused? 'barbell' : 'barbell-outline'
            }
            return <Ionicons name={IonName} size={size} color={color}/>
          },
          tabBarActiveTintColor: 'rgba(10, 39, 206, 0.4)',
          tabBarInactiveTintColor: 'rgba(48, 48, 59, 0.4)'
        })}>
          <Tab.Screen
            name="Progreso"
            component={ProgressScreen}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Rutina"
            component={RoutineListScreen}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
    )
}