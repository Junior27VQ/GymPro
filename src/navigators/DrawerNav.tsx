import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import SettingScreen from "../screens/SettingsScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(){
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="Mi Entrenamiento"
          component={TabNavigator}
          options={{title: 'Mi Entrenamiento', headerShown: true}}
        />
        <Drawer.Screen
          name="Configuracion"
          component={SettingScreen}
          options={{title: 'Configuracion', headerShown: true}}
        />
        
      </Drawer.Navigator>
    )
}