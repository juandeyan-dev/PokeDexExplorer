import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//STIVEN, AÚN NO ESTÁN CREADAS LOS SCREEN, DARÁ ERROR, PRIMERO CREALAS.
import ListaScreen from './src/screens/ListaScreen';
import DetalleScreen from './src/screens/DetalleScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Lista">
                <Stack.Screen 
                    name="Lista" 
                    component={ListaScreen} 
                    options={{ 
                        title: 'PokéDex Explorer',
                        headerStyle: { backgroundColor: '#EF5350' }, // Un toque rojo Pokémon
                        headerTintColor: '#fff',
                        headerTitleStyle: { fontWeight: 'bold' }
                    }} 
                />
                <Stack.Screen 
                    name="Detalle" 
                    component={DetalleScreen} 
                    options={{ 
                        title: 'Ficha Técnica',
                        headerStyle: { backgroundColor: '#EF5350' },
                        headerTintColor: '#fff',
                    }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
