import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import ChestDetailScreen from "../screens/ChestDetailScreen";
import SettingScreen from "../screens/SettingsScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(){
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="Configuracion"
          component={SettingScreen}
          options={{title: 'Pantalla Inicial', headerShown: true}}
        />
        <Drawer.Screen
          name="Mi Entrenamiento"
          component={TabNavigator}
          options={{title: 'Estado', headerShown: true}}
        />
      </Drawer.Navigator>
    )
}