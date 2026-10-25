import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { getPokemonDetails } from '../services/pokeAPI';

export default function DetalleScreen({ navigation, route }) {
    // Obtiene el identificador enviado desde ListaScreen.
    const { pokemonId } = route.params;

    // Estados de la petición del detalle.
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // useEffect: carga el detalle cuando cambia el Pokémon seleccionado.
    useEffect(() => {
        let active = true;
        const loadPokemonDetail = async () => {
            setLoading(true);
            setError('');
            try {
                // Consulta por número o nombre usando el servicio de la API.
                const data = await getPokemonDetails(pokemonId);
                if (active) {
                    setPokemon(data);
                }
            } catch (err) {
                if (active) {
                    setError(
                        'No pudimos cargar el detalle. Intenta nuevamente.'
                    );
                    console.log('Error cargando el detalle:', err);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };
        loadPokemonDetail();
        // Evita actualizar el estado si la pantalla se desmonta.
        return () => {
            active = false;
        };
    }, [pokemonId]);





    // Estado de carga del detalle.
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#EF5350" />
                <Text style={styles.message}>
                    Cargando detalle...
                </Text>
            </View>
        );
    }

    // Estado de error del detalle.
    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.message}>{error}</Text>

                <Button
                    title="Volver a la lista"
                    color="#EF5350"
                    onPress={() => navigation.goBack()}
                />
            </View>
        );
    }

    // Evita renderizar contenido si todavía no hay datos.
    if (!pokemon) {
        return null;
    }

    // Formatea los datos que se mostrarán en la ficha.
    const formattedName =
        pokemon.name.charAt(0).toUpperCase() +
        pokemon.name.slice(1);

    const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;

    const imageUrl =
        pokemon.sprites?.other?.['official-artwork']?.front_default ||
        pokemon.sprites?.front_default;

    const heightInMeters = (pokemon.height / 10).toFixed(1);
    const weightInKilograms = (pokemon.weight / 10).toFixed(1);

    const stats = pokemon.stats.map((statItem) => ({
        name: statItem.stat.name,
        value: statItem.base_stat
    }));

    // Colores para distinguir visualmente cada tipo.
    const typeColors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD'
    };

    // Nombres de estadísticas en español.
    const statNames = {
        hp: 'PS',
        attack: 'Ataque',
        defense: 'Defensa',
        'special-attack': 'Ataque especial',
        'special-defense': 'Defensa especial',
        speed: 'Velocidad'
    };

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                />

                <Text style={styles.idText}>{formattedId}</Text>
                <Text style={styles.title}>{formattedName}</Text>

                {/* Muestra los tipos del Pokémon con un color diferente. */}
                <View style={styles.typesContainer}>
                    {pokemon.types.map((typeItem) => {
                        const typeName = typeItem.type.name;
                        return (
                            <View
                                key={typeName}
                                style={[
                                    styles.typeBadge,
                                    {
                                        backgroundColor:
                                            typeColors[typeName] || '#777777'
                                    }
                                ]}
                            >
                                <Text style={styles.typeText}>
                                    {typeName.toUpperCase()}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* Muestra altura y peso convertidos a las unidades solicitadas. */}
                <View style={styles.measurementsContainer}>
                    <View style={styles.measurement}>
                        <Text style={styles.measurementLabel}>
                            Altura
                        </Text>
                        <Text style={styles.measurementValue}>
                            {heightInMeters} m
                        </Text>
                    </View>

                    <View style={styles.measurement}>
                        <Text style={styles.measurementLabel}>
                            Peso
                        </Text>
                        <Text style={styles.measurementValue}>
                            {weightInKilograms} kg
                        </Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>
                    Estadísticas base
                </Text>

                {/* Muestra las seis estadísticas con barras proporcionales. */}
                <View style={styles.statsContainer}>
                    {stats.map((stat) => {
                        const percentage = `${(stat.value / 255) * 100}%`;
                        return (
                            <View
                                key={stat.name}
                                style={styles.statRow}
                            >
                                <View style={styles.statHeader}>
                                    <Text style={styles.statName}>
                                        {statNames[stat.name] ||
                                            stat.name}
                                    </Text>
                                    <Text style={styles.statValue}>
                                        {stat.value}
                                    </Text>
                                </View>
                                <View style={styles.statBar}>
                                    <View
                                        style={[
                                            styles.statBarFill,
                                            { width: percentage }
                                        ]}
                                    />
                                </View>
                            </View>
                        );
                    })}
                </View>
                <Button
                    title="Volver a la lista"
                    color="#EF5350"
                    onPress={() => navigation.goBack()}
                />
            </View>
        </ScrollView>
    );

}

// StyleSheet: define los estilos de la pantalla.
const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 24
    },
    container: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5'
    },
    image: {
        width: 240,
        height: 240,
        marginBottom: 8
    },
    idText: {
        fontSize: 16,
        color: '#666666',
        fontWeight: '600'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 12
    },
    typesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 24
    },
    typeBadge: {
        minWidth: 90,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        alignItems: 'center'
    },
    typeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold'
    },
    measurementsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginBottom: 24
    },
    measurement: {
        alignItems: 'center'
    },
    measurementLabel: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 4
    },
    measurementValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222222'
    },
    sectionTitle: {
        alignSelf: 'flex-start',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 12
    },
    statsContainer: {
        width: '100%',
        marginBottom: 24
    },
    statRow: {
        width: '100%',
        marginBottom: 12
    },
    statHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    statName: {
        fontSize: 14,
        color: '#444444'
    },
    statValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#222222'
    },
    statBar: {
        width: '100%',
        height: 10,
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
        overflow: 'hidden'
    },
    statBarFill: {
        height: '100%',
        backgroundColor: '#EF5350',
        borderRadius: 5
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 16,
        color: '#333333'
    }
});
