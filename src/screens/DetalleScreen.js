import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DetalleScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalle del Pokémon</Text>

            {/* Navegación: regresa a la pantalla anterior del Stack */}
            <Button
                title="Volver a la lista"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

//StyleSheet: define los estilos de la pantalla.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    }
});