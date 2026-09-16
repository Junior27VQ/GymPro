import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoutineListScreen({navigation}: any){
    return (
      <SafeAreaView>
        <View>
          <Text>Lista de Rutinas</Text>
          <Button
            title='Ver Rutina de Pecho'
            onPress={()=> navigation.navigate('Detail')}
          />
        </View>
      </SafeAreaView>
    )
}