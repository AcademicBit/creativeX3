import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers';
import '../styles/styles.css';

const UserManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    trabalho: '',
    telefone: '',
    cidade: ''
  });
  const [errors, setErrors] = useState({
    nome: '',
    trabalho: '',
    telefone: '',
    cidade: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validação do nome
    if (!formData.nome) {
      newErrors.nome = 'Por favor, preencha o nome';
      isValid = false;
    } else if (formData.nome.length < 3) {
      newErrors.nome = 'O nome deve ter pelo menos 3 caracteres';
      isValid = false;
    }

    // Validação do trabalho
    if (!formData.trabalho) {
      newErrors.trabalho = 'Por favor, preencha o trabalho';
      isValid = false;
    }

    // Validação do telefone
    const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/;
    if (!formData.telefone) {
      newErrors.telefone = 'Por favor, preencha o telefone';
      isValid = false;
    } else if (!phoneRegex.test(formData.telefone)) {
      newErrors.telefone = 'Digite um telefone válido (ex: 11999999999)';
      isValid = false;
    }

    // Validação da cidade
    if (!formData.cidade) {
      newErrors.cidade = 'Por favor, preencha a cidade';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa o erro do campo quando o usuário começa a digitar
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      await createUser(formData);
      setIsCreateModalOpen(false);
      setFormData({
        nome: '',
        trabalho: '',
        telefone: '',
        cidade: ''
      });
      fetchUsers();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (!selectedUser?.id) {
      console.error('ID do usuário não encontrado');
      return;
    }
    try {
      await updateUser(selectedUser.id, formData);
      setIsUpdateModalOpen(false);
      setSelectedUser(null);
      setFormData({
        nome: '',
        trabalho: '',
        telefone: '',
        cidade: ''
      });
      fetchUsers();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser?.id) {
      console.error('ID do usuário não encontrado');
      return;
    }
    try {
      await deleteUser(selectedUser.id);
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const selectUserForUpdate = (user) => {
    if (!user?.id) {
      console.error('ID do usuário não encontrado');
      return;
    }
    setSelectedUser(user);
    setFormData({
      nome: user.nome || '',
      trabalho: user.trabalho || '',
      telefone: user.telefone || '',
      cidade: user.cidade || ''
    });
    setIsUpdateModalOpen(true);
  };

  const selectUserForDelete = (user) => {
    if (!user?.id) {
      console.error('ID do usuário não encontrado');
      return;
    }
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

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
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modal: {
      backgroundColor: '#262626',
      borderRadius: '12px',
      padding: '30px',
      width: '95%',
      maxWidth: '700px',
      maxHeight: '80vh',
      position: 'relative',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      borderBottom: '1px solid #333',
      paddingBottom: '15px',
      flex: '0 0 auto'
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
      gap: '20px',
      flex: '1 1 auto',
      overflowY: 'auto'
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
      marginTop: '20px',
      flex: '0 0 auto'
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
    },
    userList: {
      flex: '1 1 auto',
      overflowY: 'auto',
      maxHeight: 'calc(80vh - 150px)',
      padding: '10px'
    },
    userItem: {
      background: '#333',
      padding: '20px',
      marginBottom: '15px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid transparent',
      display: 'block',
      textDecoration: 'none'
    },
    userInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      pointerEvents: 'none'
    },
    userTitle: {
      color: '#fff',
      margin: 0,
      fontSize: '1.2em',
      borderBottom: '1px solid #404040',
      paddingBottom: '8px',
      pointerEvents: 'none'
    },
    userDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      pointerEvents: 'none'
    },
    userDetail: {
      color: '#ccc',
      margin: 0,
      fontSize: '1em',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      pointerEvents: 'none'
    },
    userLabel: {
      color: '#ff8c00',
      minWidth: '80px',
      pointerEvents: 'none'
    },
    confirmContent: {
      padding: '20px 0',
      flex: '1 1 auto'
    },
    confirmText: {
      color: '#fff',
      fontSize: '1.1em',
      textAlign: 'center',
      marginBottom: '20px'
    }
  };

  const errorMessageStyle = {
    color: '#ff8c00',
    fontSize: '0.8em',
    marginTop: '4px'
  };

  return (
    <Box 
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#000'
      }}
    >
      <Grid 
        container 
        spacing={3} 
        justifyContent="center" 
        alignItems="center" 
        sx={{ 
          width: 'auto',
          margin: 0,
          maxWidth: '800px'
        }}
      >
        <Grid item>
          <div className="card" onClick={() => {
            setIsCreateModalOpen(true);
            setFormData({
              nome: '',
              trabalho: '',
              telefone: '',
              cidade: ''
            });
          }} style={{ width: '240px', height: '240px' }}>
            <div className="card-content">
              <h3>Cadastrar</h3>
              <AddIcon sx={{ fontSize: 50, color: '#ff8c00', marginTop: '20px' }} />
            </div>
          </div>
        </Grid>
        <Grid item>
          <div className="card" onClick={() => setIsUpdateModalOpen(true)} style={{ width: '240px', height: '240px' }}>
            <div className="card-content">
              <h3>Editar</h3>
              <EditIcon sx={{ fontSize: 50, color: '#ff8c00', marginTop: '20px' }} />
            </div>
          </div>
        </Grid>
        <Grid item>
          <div className="card" onClick={() => setIsDeleteModalOpen(true)} style={{ width: '240px', height: '240px' }}>
            <div className="card-content">
              <h3>Excluir</h3>
              <DeleteIcon sx={{ fontSize: 50, color: '#ff8c00', marginTop: '20px' }} />
            </div>
          </div>
        </Grid>
      </Grid>

      {/* Modal de Cadastro */}
      <div 
        className={`modal-overlay ${isCreateModalOpen ? 'visible' : ''}`} 
        style={{
          ...modalStyle.overlay, 
          display: isCreateModalOpen ? 'flex' : 'none'
        }}
      >
        <div style={modalStyle.modal}>
          <div style={modalStyle.header}>
            <h2 style={modalStyle.title}>Cadastrar Novo Usuário</h2>
            <button 
              style={modalStyle.closeButton}
              onClick={() => {
                setIsCreateModalOpen(false);
                setFormData({
                  nome: '',
                  trabalho: '',
                  telefone: '',
                  cidade: ''
                });
              }}
              onMouseOver={(e) => e.target.style.color = '#ff8c00'}
              onMouseOut={(e) => e.target.style.color = '#fff'}
            >
              ×
            </button>
          </div>
          <form onSubmit={handleCreateUser} style={modalStyle.form}>
            <div style={modalStyle.formGroup}>
              <label style={modalStyle.label}>Nome:</label>
              <input
                style={{
                  ...modalStyle.input,
                  borderColor: errors.nome ? '#ff8c00' : '#444'
                }}
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                onFocus={(e) => e.target.style.borderColor = '#ff8c00'}
                onBlur={(e) => e.target.style.borderColor = errors.nome ? '#ff8c00' : '#444'}
              />
              {errors.nome && <span style={errorMessageStyle}>{errors.nome}</span>}
            </div>
            <div style={modalStyle.formGroup}>
              <label style={modalStyle.label}>Trabalho:</label>
              <input
                style={{
                  ...modalStyle.input,
                  borderColor: errors.trabalho ? '#ff8c00' : '#444'
                }}
                type="text"
                name="trabalho"
                value={formData.trabalho}
                onChange={handleInputChange}
                onFocus={(e) => e.target.style.borderColor = '#ff8c00'}
                onBlur={(e) => e.target.style.borderColor = errors.trabalho ? '#ff8c00' : '#444'}
              />
              {errors.trabalho && <span style={errorMessageStyle}>{errors.trabalho}</span>}
            </div>
            <div style={modalStyle.formGroup}>
              <label style={modalStyle.label}>Telefone:</label>
              <input
                style={{
                  ...modalStyle.input,
                  borderColor: errors.telefone ? '#ff8c00' : '#444'
                }}
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                onFocus={(e) => e.target.style.borderColor = '#ff8c00'}
                onBlur={(e) => e.target.style.borderColor = errors.telefone ? '#ff8c00' : '#444'}
              />
              {errors.telefone && <span style={errorMessageStyle}>{errors.telefone}</span>}
            </div>
            <div style={modalStyle.formGroup}>
              <label style={modalStyle.label}>Cidade:</label>
              <input
                style={{
                  ...modalStyle.input,
                  borderColor: errors.cidade ? '#ff8c00' : '#444'
                }}
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                onFocus={(e) => e.target.style.borderColor = '#ff8c00'}
                onBlur={(e) => e.target.style.borderColor = errors.cidade ? '#ff8c00' : '#444'}
              />
              {errors.cidade && <span style={errorMessageStyle}>{errors.cidade}</span>}
            </div>
            <div style={modalStyle.buttonGroup}>
              <button
                type="button"
                style={{...modalStyle.button, ...modalStyle.cancelButton}}
                onClick={() => setIsCreateModalOpen(false)}
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
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Seleção para Edição */}
      <div 
        className={`modal-overlay ${isUpdateModalOpen && !selectedUser ? 'visible' : ''}`} 
        style={{
          ...modalStyle.overlay, 
          display: isUpdateModalOpen && !selectedUser ? 'flex' : 'none'
        }}
      >
        <div style={modalStyle.modal}>
          <div style={modalStyle.header}>
            <h2 style={modalStyle.title}>Selecione um usuário para editar</h2>
            <button 
              style={modalStyle.closeButton}
              onClick={() => setIsUpdateModalOpen(false)}
              onMouseOver={(e) => e.target.style.color = '#ff8c00'}
              onMouseOut={(e) => e.target.style.color = '#fff'}
            >
              ×
            </button>
          </div>
          <div style={modalStyle.userList}>
            {users.map(user => (
              <div 
                key={user.id}
                style={modalStyle.userItem}
                onClick={() => selectUserForUpdate(user)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#404040';
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.borderColor = '#ff8c00';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#333';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div style={modalStyle.userInfo}>
                  <h3 style={modalStyle.userTitle}>{user.nome}</h3>
                  <div style={modalStyle.userDetails}>
                    <p style={modalStyle.userDetail}>
                      <strong style={modalStyle.userLabel}>Trabalho:</strong>
                      {user.trabalho}
                    </p>
                    <p style={modalStyle.userDetail}>
                      <strong style={modalStyle.userLabel}>Telefone:</strong>
                      {user.telefone}
                    </p>
                    <p style={modalStyle.userDetail}>
                      <strong style={modalStyle.userLabel}>Cidade:</strong>
                      {user.cidade}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Edição */}
      {selectedUser && (
        <div 
          className={`modal-overlay ${isUpdateModalOpen ? 'visible' : ''}`} 
          style={{
            ...modalStyle.overlay, 
            display: isUpdateModalOpen ? 'flex' : 'none'
          }}
        >
          <div style={modalStyle.modal}>
            <div style={modalStyle.header}>
              <h2 style={modalStyle.title}>Editar Usuário</h2>
              <button 
                style={modalStyle.closeButton}
                onClick={() => {
                  setIsUpdateModalOpen(false);
                  setSelectedUser(null);
                  setFormData({
                    nome: '',
                    trabalho: '',
                    telefone: '',
                    cidade: ''
                  });
                }}
                onMouseOver={(e) => e.target.style.color = '#ff8c00'}
                onMouseOut={(e) => e.target.style.color = '#fff'}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUpdateUser} style={modalStyle.form}>
              <div style={modalStyle.formGroup}>
                <label style={modalStyle.label}>Nome:</label>
                <input
                  style={{
                    ...modalStyle.input,
                    borderColor: errors.nome ? '#ff8c00' : '#444'
                  }}
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  onFocus={(e) => e.target.style.borderColor = '#ff8c00'}
                  onBlur={(e) => e.target.style.borderColor = errors.nome ? '#ff8c00' : '#444'}
                />
                {errors.nome && <span style={errorMessageStyle}>{errors.nome}</span>}
              </div>
              <div style={modalStyle.formGroup}>
                <label style={modalStyle.label}>Trabalho:</label>
                <input
                  style={{
                    ...modalStyle.input,
                    borderColor: errors.trabalho ? '#ff8c00' : '#444'
                  }}
                  type="text"
                  name="trabalho"
                  value={formData.trabalho}
                  onChange={handleInputChange}
                  onFocus={(e) => e.target.style.borderColor = '#ff8c00'}
                  onBlur={(e) => e.target.style.borderColor = errors.trabalho ? '#ff8c00' : '#444'}
                />
                {errors.trabalho && <span style={errorMessageStyle}>{errors.trabalho}</span>}
              </div>
              <div style={modalStyle.formGroup}>
                <label style={modalStyle.label}>Telefone:</label>
                <input
                  style={{
                    ...modalStyle.input,
                    borderColor: errors.telefone ? '#ff8c00' : '#444'
                  }}
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  onFocus={(e) => e.target.style.borderColor = '#ff8c00'}
                  onBlur={(e) => e.target.style.borderColor = errors.telefone ? '#ff8c00' : '#444'}
                />
                {errors.telefone && <span style={errorMessageStyle}>{errors.telefone}</span>}
              </div>
              <div style={modalStyle.formGroup}>
                <label style={modalStyle.label}>Cidade:</label>
                <input
                  style={{
                    ...modalStyle.input,
                    borderColor: errors.cidade ? '#ff8c00' : '#444'
                  }}
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  onFocus={(e) => e.target.style.borderColor = '#ff8c00'}
                  onBlur={(e) => e.target.style.borderColor = errors.cidade ? '#ff8c00' : '#444'}
                />
                {errors.cidade && <span style={errorMessageStyle}>{errors.cidade}</span>}
              </div>
              <div style={modalStyle.buttonGroup}>
                <button
                  type="button"
                  style={{...modalStyle.button, ...modalStyle.cancelButton}}
                  onClick={() => {
                    setIsUpdateModalOpen(false);
                    setSelectedUser(null);
                  }}
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
                  Atualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Seleção para Exclusão */}
      <div 
        className={`modal-overlay ${isDeleteModalOpen && !selectedUser ? 'visible' : ''}`} 
        style={{
          ...modalStyle.overlay, 
          display: isDeleteModalOpen && !selectedUser ? 'flex' : 'none'
        }}
      >
        <div style={modalStyle.modal}>
          <div style={modalStyle.header}>
            <h2 style={modalStyle.title}>Selecione um usuário para excluir</h2>
            <button 
              style={modalStyle.closeButton}
              onClick={() => setIsDeleteModalOpen(false)}
              onMouseOver={(e) => e.target.style.color = '#ff8c00'}
              onMouseOut={(e) => e.target.style.color = '#fff'}
            >
              ×
            </button>
          </div>
          <div style={modalStyle.userList}>
            {users.map(user => (
              <div 
                key={user.id}
                style={{
                  ...modalStyle.userItem,
                  borderColor: '#dc3545'
                }}
                onClick={() => selectUserForDelete(user)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#404040';
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.borderColor = '#ff4444';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#333';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = '#dc3545';
                }}
              >
                <div style={modalStyle.userInfo}>
                  <h3 style={modalStyle.userTitle}>{user.nome}</h3>
                  <div style={modalStyle.userDetails}>
                    <p style={modalStyle.userDetail}>
                      <strong style={modalStyle.userLabel}>Trabalho:</strong>
                      {user.trabalho}
                    </p>
                    <p style={modalStyle.userDetail}>
                      <strong style={modalStyle.userLabel}>Telefone:</strong>
                      {user.telefone}
                    </p>
                    <p style={modalStyle.userDetail}>
                      <strong style={modalStyle.userLabel}>Cidade:</strong>
                      {user.cidade}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {selectedUser && (
        <div 
          className={`modal-overlay ${isDeleteModalOpen ? 'visible' : ''}`} 
          style={{
            ...modalStyle.overlay, 
            display: isDeleteModalOpen ? 'flex' : 'none'
          }}
        >
          <div style={modalStyle.modal}>
            <div style={modalStyle.header}>
              <h2 style={modalStyle.title}>Confirmar Exclusão</h2>
              <button 
                style={modalStyle.closeButton}
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedUser(null);
                }}
                onMouseOver={(e) => e.target.style.color = '#ff8c00'}
                onMouseOut={(e) => e.target.style.color = '#fff'}
              >
                ×
              </button>
            </div>
            <div style={modalStyle.confirmContent}>
              <p style={modalStyle.confirmText}>
                Tem certeza que deseja excluir o usuário {selectedUser.nome}?
              </p>
              <div style={modalStyle.buttonGroup}>
                <button
                  type="button"
                  style={{...modalStyle.button, ...modalStyle.cancelButton}}
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedUser(null);
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#505050'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#404040'}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  style={{...modalStyle.button, backgroundColor: '#ff4444', color: '#fff'}}
                  onClick={handleDeleteUser}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#ff6666'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#ff4444'}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default UserManagement; 