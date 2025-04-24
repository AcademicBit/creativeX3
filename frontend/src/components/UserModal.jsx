import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles.css';

const UserModal = ({ open, handleClose, user, type, onSuccess }) => {
    const [formData, setFormData] = useState({
        nome: '',
        email: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                nome: user.nome || '',
                email: user.email || ''
            });
        } else {
            setFormData({
                nome: '',
                email: ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (type === 'create') {
                await axios.post('http://localhost:8800/api/usuarios', formData);
            } else {
                await axios.put(`http://localhost:8800/api/usuarios/${user.id}`, formData);
            }
            handleClose();
            onSuccess();
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
        }
    };

    if (!open) return null;

    const modalStyle = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
            display: open ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center'
        },
        modal: {
            backgroundColor: '#262626',
            borderRadius: '12px',
            padding: '30px',
            width: '95%',
            maxWidth: '600px',
            position: 'relative',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '1px solid #333',
            paddingBottom: '15px'
        },
        title: {
            color: '#ff8c00',
            margin: 0,
            fontSize: '1.5em'
        },
        closeButton: {
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '5px',
            transition: 'color 0.2s ease'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        },
        label: {
            color: '#fff',
            fontSize: '0.9em'
        },
        input: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#333',
            border: '1px solid #444',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '1em',
            transition: 'all 0.2s ease',
            outline: 'none'
        },
        buttonGroup: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '20px'
        },
        button: {
            padding: '12px 24px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.9em',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        },
        cancelButton: {
            backgroundColor: '#404040',
            color: '#fff'
        },
        submitButton: {
            backgroundColor: '#ff8c00',
            color: '#000'
        }
    };

    return (
        <div style={modalStyle.overlay}>
            <div style={modalStyle.modal}>
                <div style={modalStyle.header}>
                    <h2 style={modalStyle.title}>
                        {type === 'create' ? 'Adicionar Usuário' : 'Editar Usuário'}
                    </h2>
                    <button 
                        style={modalStyle.closeButton}
                        onClick={handleClose}
                        onMouseOver={(e) => e.target.style.color = '#ff8c00'}
                        onMouseOut={(e) => e.target.style.color = '#fff'}
                    >
                        ×
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} style={modalStyle.form}>
                    <div style={modalStyle.formGroup}>
                        <label style={modalStyle.label}>Nome:</label>
                        <input
                            style={modalStyle.input}
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            onFocus={(e) => e.target.style.borderColor = '#ff8c00'}
                            onBlur={(e) => e.target.style.borderColor = '#444'}
                        />
                    </div>
                    
                    <div style={modalStyle.formGroup}>
                        <label style={modalStyle.label}>Email:</label>
                        <input
                            style={modalStyle.input}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            onFocus={(e) => e.target.style.borderColor = '#ff8c00'}
                            onBlur={(e) => e.target.style.borderColor = '#444'}
                        />
                    </div>

                    <div style={modalStyle.buttonGroup}>
                        <button
                            type="button"
                            style={{...modalStyle.button, ...modalStyle.cancelButton}}
                            onClick={handleClose}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#505050'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#404040'}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            style={{...modalStyle.button, ...modalStyle.submitButton}}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#ffa500'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#ff8c00'}
                        >
                            {type === 'create' ? 'Criar' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal; 