import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Books() {
    const [books, setBooks] = useState([]);
    const [total, setTotal] = useState(0);

    const navigation = useNavigation();

    function navigateToDetail(book) {
        navigation.navigate('Detail', { book });
    }

    async function loadBooks() {
        const response = await api.get('books');

        setBooks(response.data);
        setTotal(response.headers['x-total-count']);
    }

    useEffect(() =>{
        loadBooks();
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} livros cadastrados</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem vindx!</Text>
            <Text style={styles.description}>Escolha um dos livros,</Text>
            <Text style={styles.description}>converse para acertar os detalhes e <Text style={styles.headerTextBold}>seja feliz.</Text></Text>            
            <FlatList 
                style={styles.bookList}
                data={books}
                keyExtractor={book => String(book.id)}
                renderItem={({ item: book }) => (
                    <View style={styles.book}>
                        <Text style={styles.bookProperty}>NOME DO LIVRO:</Text>
                        <Text style={styles.bookValue}>{book.title}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(book)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}