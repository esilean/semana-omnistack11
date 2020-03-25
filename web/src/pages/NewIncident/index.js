import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {

    const history = useHistory();

    const ongId = localStorage.getItem('ongId')
    //const ongName = localStorage.getItem('ongName')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')


    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            title,
            description,
            value,
        }

        //Gambiarra?????
        data.value = value.replace(',', '.')

        try {
            const response = await api.post(`incidents/${ongId}`, data)

            if (response.data.id > 0)
                history.push('/profile')
            else
                alert('Erro no cadastro. Tente novamente.')
        } catch (err) {
            alert('Erro no cadastro. Tente novamente.')
        }



    }

    return (
        <div className="newincident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />

                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Título do caso" />
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição do caso" />
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor em R$" />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}