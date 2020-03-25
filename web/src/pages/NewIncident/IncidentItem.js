import React from 'react';
import { FiTrash2 } from 'react-icons/fi'

import './styles.css';

function IncidentItem({ incid, onDelete }) {

    async function handleDelete(id) {
        await onDelete(id);
    }

    return (

        <li>
            <strong>CASO:</strong>
            <p>{incid.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incid.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incid.value)}</p>

            <button type="button" onClick={() => handleDelete(incid.id)}>
                <FiTrash2 size={18} color="#a8a8b3"></FiTrash2>
            </button>
        </li>
    )
}

export default IncidentItem;