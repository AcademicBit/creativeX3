import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AboutIt = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
      padding: '20px',
      fontFamily: 'Montserrat, sans-serif',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0
    },
    paper: {
      backgroundColor: '#262626',
      padding: '40px',
      borderRadius: '12px',
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
      border: '1px solid #333',
      fontFamily: 'Montserrat, sans-serif',
      margin: 'auto'
    },
    title: {
      color: '#ff8c00',
      marginBottom: '30px',
      textAlign: 'center',
      fontSize: '2em',
      fontWeight: '500',
      fontFamily: 'Montserrat, sans-serif'
    },
    infoContainer: {
      marginBottom: '30px'
    },
    label: {
      color: '#ff8c00',
      fontSize: '1.1em',
      marginBottom: '5px',
      fontFamily: 'Montserrat, sans-serif'
    },
    value: {
      color: '#fff',
      fontSize: '1em',
      marginBottom: '20px',
      fontFamily: 'Montserrat, sans-serif'
    },
    button: {
      backgroundColor: 'transparent',
      border: '1px solid #ff8c00',
      color: '#ff8c00',
      padding: '10px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '1em',
      transition: 'all 0.3s ease',
      marginTop: '20px',
      fontFamily: 'Montserrat, sans-serif',
      '&:hover': {
        backgroundColor: '#ff8c00',
        color: '#000'
      }
    }
  };

  return (
    <Box sx={styles.container}>
      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Paper sx={styles.paper}>
          <Typography variant="h1" sx={styles.title}>
            Sobre o Desenvolvimento
          </Typography>
          
          <div style={styles.infoContainer}>
            <Typography sx={styles.label}>
              Autor:
            </Typography>
            <Typography sx={styles.value}>
              Jorge Samuel Teixeira Jordão
            </Typography>

            <Typography sx={styles.label}>
              Curso:
            </Typography>
            <Typography sx={styles.value}>
              Ciência da Computação - 5º Período
            </Typography>

            <Typography sx={styles.label}>
              Área de Atuação:
            </Typography>
            <Typography sx={styles.value}>
              Desenvolvedor Fullstack com foco em CRM e financeiro
            </Typography>
          </div>

          <button
            style={styles.button}
            onClick={() => navigate('/')}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#ff8c00';
              e.target.style.color = '#000';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#ff8c00';
            }}
          >
            Voltar para Home
          </button>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutIt; 