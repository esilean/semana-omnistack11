import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'

import api from '../../services/api'
import logoImg from '../../assets/logo.svg'

export default function Register() {

    const history = useHistory();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsApp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUF] = useState('')

    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        //console.log(data)

        try {
            const response = await api.post('ongs', data)

            alert(`Seu ID de Acesso: ${response.data.id}`)

            history.push('/')
        } catch (err) {
            alert('Erro no cadastro. Tente novamente.')
        }

    }



    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para o Logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        maxLength={7}
                        placeholder="Nome da ONG" />
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email" placeholder="E-mail" />
                    <input
                        value={whatsapp}
                        onChange={e => setWhatsApp(e.target.value)}
                        maxLength={20}
                        placeholder="WhatsApp" />

                    <div className="input-group">
                        <input
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder="Cidade" />
                        <input
                            value={uf}
                            onChange={e => setUF(e.target.value)}
                            placeholder="UF" 
                            maxLength={2}
                            style={{ width: 80 }} />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}