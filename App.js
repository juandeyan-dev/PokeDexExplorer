import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaScreen from './src/screens/ListaScreen';
import DetalleScreen from './src/screens/DetalleScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Lista"
                    component={ListaScreen}
                    options={{ title: 'PokéDex Explorer' }}
                />

                <Stack.Screen
                    name="Detalle"
                    component={DetalleScreen}
                    options={{ title: 'Detalle del Pokémon' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
