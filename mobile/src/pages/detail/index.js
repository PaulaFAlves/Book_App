import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from '../detail/styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const book = route.params.book;
    const message = `Oi, ${book.name}. Gostei do livro ${book.title} e gostaria de pegar emprestado, pode ser? Vamos combinar os detalhes?`

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Me empresta teu livro ${book.title}?`,
            recipients: [book.email],
            body: message,
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=5551998558880&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>
            <View style={styles.book}>
                <Text style={[styles.bookProperty, { marginTop: 0 }]}>NOME DO LIVRO:</Text>
                <Text style={styles.bookValue}>{book.title}</Text>
                <Text style={styles.bookDescription}>{book.summary }</Text>
                <Text style={styles.bookProperty}>NOTA:</Text>
                <Text style={styles.bookDescription}>10</Text>

  
            </View>
            <View style={styles.contactBox}>
                <Text style={styles.contactTitle}>Gostou do livro?</Text>
                <Text style={styles.contactDescription}>Então, entre em contato e combina os detalhes:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhastApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>

            </View>


        </View>
    );
}