import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'

import api from '../../services/api'
import styles from './styles'

import logoImg from '../../assets/logo.png'

export default function Incidents() {
    const navigation = useNavigation()

    const [incidents, setIncidents] = useState([])
    const [totalIncidents, setTotalIncidents] = useState(0)
    //Controle de scroll
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigateToDetail(incident) {
        navigation.navigate('Detail', {
            incident
        })
    }

    async function loadIncidents() {
        if (loading)
            return

        if (totalIncidents > 0 && incidents.length === totalIncidents)
            return

        setLoading(true)

        const response = await api.get('incidents', {
            params: { page }
        })

        setIncidents([...incidents, ...response.data])
        setTotalIncidents(response.headers['x-total-count'])

        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [incidents, page])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{totalIncidents} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e seja um herói.</Text>

            <FlatList style={styles.incidentList}
                data={incidents}
                showsVerticalScrollIndicator={false}
                keyExtractor={incident => String(incident.id)}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.ong.name} de {incident.ong.city}/{incident.ong.uf}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                        </Text>
                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041"></Feather>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}