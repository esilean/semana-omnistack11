import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Image, Text, TouchableOpacity, Linking } from 'react-native'

import * as MailComposer from 'expo-mail-composer'

import api from '../../services/api'
import styles from './styles'

import logoImg from '../../assets/logo.png'

export default function Detail() {
    const navigation = useNavigation()
    const route = useRoute()

    const incident = route.params.incident

    const message = `Olá ${incident.ong.name}, gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}.`

    function navigateBack() {
        navigation.goBack()
    }

    function sendWApp() {
        Linking.openURL(`whatsapp://send?phone=55${incident.ong.whatsapp}&text=${message}`)
    }

    function sendEmail() {
        MailComposer.composeAsync({
            subject: 'Herói do Caso: ' + incident.title,
            recipients: [incident.ong.email],
            body: message,
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041"></Feather>
                </TouchableOpacity>
            </View>


            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.ong.name} de {incident.ong.city}/{incident.ong.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>

            </View>


        </View>
    )
}