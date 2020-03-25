import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'
import IncidentItem from '../NewIncident/IncidentItem'

import logoImg from '../../assets/logo.svg'

export default function Profile() {
    const history = useHistory()

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    const [incidents, setIncidents] = useState([])

    useEffect(() => {
        async function loadIncidents() {
            const response = await api.get(`/incidents/${ongId}`);

            setIncidents(response.data);
        }

        loadIncidents();
    }, [ongId]);


    async function handleDelete(id) {
        await api.delete(`/incidents/${ongId}/${id}`);
        const newIncidentsList = incidents.filter(d => d.id !== id);
        setIncidents(newIncidentsList);
    }

    function handleLogout() {
        localStorage.removeItem('ongId')
        localStorage.removeItem('ongName')

        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={() => handleLogout()}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incid => (
                    <IncidentItem key={incid.id} incid={incid} onDelete={handleDelete} />
                ))}
            </ul>
        </div>
    )
}