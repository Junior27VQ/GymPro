import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import SettingScreen from "../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        // Configuración de iconos dinámicos según la pantalla del menú lateral
        drawerIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'Mi Entrenamiento') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Configuracion') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Estilos generales del menú lateral
        drawerActiveTintColor: '#2563EB',
        drawerInactiveTintColor: '#64748B',
        drawerActiveBackgroundColor: '#EFF6FF',
        drawerItemStyle: {
          borderRadius: 10,
          paddingHorizontal: 8,
          marginVertical: 4,
        },
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
          marginLeft: -10,
        },
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: 280,
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#E2E8F0',
        },
        headerTintColor: '#0F172A',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Drawer.Screen
        name="Mi Entrenamiento"
        component={TabNavigator}
        options={{ title: 'Mi Entrenamiento', headerShown: true }}
      />
      <Drawer.Screen
        name="Configuracion"
        component={SettingScreen}
        options={{ title: 'Configuración', headerShown: true }}
      />
    </Drawer.Navigator>
  );
}