import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
    const history = useHistory();

    const [id, setId] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        const data = { id }

        try {
            const response = await api.post('sessions', data)

            //alert(`Seu ID de Acesso: ${response.data.id}`)

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')
        } catch (err) {
            alert('Erro no Login. Tente novamente.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>

                    <input
                        value={id}
                        onChange={e => setId(e.target.value)}
                        placeholder="Sua ID" />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color='#e02041' />
                        Não tenho cadastro</Link>
                </form>

            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}