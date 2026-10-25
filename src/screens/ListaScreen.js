import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import PokemonCard from '../components/PokemonCard';
import {
    getPokemonDetails,
    searchPokemon
} from '../services/pokeAPI';

export default function ListaScreen({ navigation }) {
    // useState: guarda los Pokémon y los estados de la petición.
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [retryCount, setRetryCount] = useState(0);

    // useState: controla la búsqueda y sus resultados.
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [searching, setSearching] = useState(false);
    const [searchError, setSearchError] = useState('');

    // useEffect: carga los primeros 20 Pokémon al abrir la pantalla.
    useEffect(() => {
        let active = true;

        const loadPokemons = async () => {
            setLoading(true);
            setError('');

            try {
                // async/await: espera la respuesta de la API.
                // La petición está separada en el archivo de servicios.
                const data = await searchPokemon(20, 0);

                if (active) {
                    setPokemons(data);
                }
            } catch (err) {
                if (active) {
                    setError(
                        'No pudimos cargar los Pokémon. Revisa tu conexión.'
                    );

                    console.log('Error cargando Pokémon:', err);
                }
            } finally {
                // finally: termina la carga aunque haya éxito o error.
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadPokemons();

        // Limpieza: ignora el resultado si la pantalla se desmonta.
        return () => {
            active = false;
        };
    }, [retryCount]);

    // async/await: busca un Pokémon por nombre o número.
    const handleSearch = async () => {
        const cleanQuery = query.trim().toLowerCase();

        // Una búsqueda vacía vuelve al catálogo.
        if (!cleanQuery) {
            setSearchResults(null);
            setSearchError('');
            return;
        }

        setSearching(true);
        setSearchError('');
        setSearchResults(null);

        try {
            const pokemon = await getPokemonDetails(cleanQuery);

            // Adaptamos la ficha al formato de PokemonCard.
            setSearchResults([
                {
                    id: String(pokemon.id),
                    name: pokemon.name,
                    image:
                        pokemon.sprites?.other?.['official-artwork']
                            ?.front_default ||
                        pokemon.sprites?.front_default
                }
            ]);
        } catch (err) {
            // Si el Pokémon no existe, mostramos el estado vacío.
            if (/\b404\b/.test(err.message)) {
                setSearchResults([]);
            } else {
                setSearchError(
                    'No pudimos buscar. Revisa tu conexión e intenta otra vez.'
                );
            }
        } finally {
            setSearching(false);
        }
    };

    // Estado de carga inicial.
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#EF5350" />
                <Text style={styles.message}>
                    Cargando Pokémon...
                </Text>
            </View>
        );
    }

    // Estado de error al cargar la lista.
    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.message}>{error}</Text>

                <Button
                    title="Reintentar"
                    color="#EF5350"
                    onPress={() => {
                        setRetryCount((previous) => previous + 1);
                    }}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* TextInput: recibe nombre o número sin autocorrección. */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Busca por nombre o número..."
                    value={query}
                    editable={!searching}
                    onChangeText={(text) => {
                        setQuery(text);

                        // Al borrar la búsqueda, recuperamos el catálogo.
                        if (!text.trim()) {
                            setSearchResults(null);
                            setSearchError('');
                        }
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={handleSearch}
                />

                <Button
                    title="Buscar"
                    color="#EF5350"
                    onPress={handleSearch}
                    disabled={searching}
                />
            </View>

            {searching && (
                <View style={styles.searchStatus}>
                    <ActivityIndicator color="#EF5350" />
                    <Text style={styles.message}>
                        Buscando Pokémon...
                    </Text>
                </View>
            )}

            {!!searchError && (
                <View style={styles.searchStatus}>
                    <Text style={styles.message}>{searchError}</Text>

                    <Button
                        title="Reintentar"
                        color="#EF5350"
                        onPress={handleSearch}
                        disabled={searching}
                    />
                </View>
            )}

            {/* FlatList: muestra las tarjetas en una cuadrícula de dos columnas. */}
            <FlatList
                data={searchResults ?? pokemons}
                numColumns={2}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <PokemonCard
                        pokemon={item}
                        onPress={() => {
                            navigation.navigate('Detalle', {
                                pokemonId: item.id
                            });
                        }}
                    />
                )}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={styles.message}>
                        {searchResults !== null
                            ? 'No encontramos ese Pokémon.'
                            : 'No hay Pokémon para mostrar.'}
                    </Text>
                }
            />
        </View>
    );
}

// StyleSheet: organiza los estilos fuera de la lógica.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 8
    },
    input: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5'
    },
    searchStatus: {
        alignItems: 'center',
        paddingHorizontal: 16
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 16,
        color: '#333333'
    },
    list: {
        padding: 8,
        paddingBottom: 24
    }
});
