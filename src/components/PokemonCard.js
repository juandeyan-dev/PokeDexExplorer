import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export default function PokemonCard({ pokemon, onPress }) {

    const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;
    
    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    return (
        <Pressable 
            style={styles.card} 
            onPress={onPress}
        >
            <Image
                source={{ uri : `#${String(pokemon.image)}`}}
                style={styles.image}
            />
            <Text style={styles.idText}>{formattedId}</Text>
            <Text style={styles.nameText}>{capitalizedName}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1, 
        margin: 8,
        padding: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        alignItems: 'center', 
        borderWidth: 1,
        borderColor: '#E0E0E0',
        elevation: 2, // Sombra suave en Android
        shadowColor: '#000', // Sombras en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image:{
        width: 100,
        height: 100,
        marginBottom: 8
    },
    text:{
        fontSize: 12,
        color: '#666666',
        fontWeight: '500',
    },
    nameText: {
        fontSize: 16,
        color: '#333333',
        fontWeight: 'bold',
        marginTop: 4,
    }
});