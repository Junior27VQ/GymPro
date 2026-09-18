import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ProgressScreen from "../screens/ProgressScreen";
import RoutineListScreen from "../screens/RoutineListScreen";

// Define aquí mismo tu tipado de tabs o impórtalo
export type TabParamList = {
  Progreso: undefined;
  Rutina: undefined;
};

// Agrégale <TabParamList> aquí:
const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator(){
    return (
        <Tab.Navigator screenOptions={({route})=> ({
          headerShown: false,
          tabBarIcon: ({focused, color, size})=> {
            let IonName: keyof typeof Ionicons.glyphMap = 'list-outline';
            if(route.name === 'Progreso'){
              IonName = focused ? 'stats-chart' : 'stats-chart-outline';
            } else if(route.name === 'Rutina'){
              IonName = focused ? 'barbell' : 'barbell-outline';
            }
            return <Ionicons name={IonName} size={size} color={color}/>
          },
          tabBarActiveTintColor: '#2563EB',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E2E8F0',
            height: 60,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
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