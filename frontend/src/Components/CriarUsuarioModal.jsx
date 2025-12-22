import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { TextField } from '@mui/material'
import styled from 'styled-components'
import { useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //height: 100vh; /* optional: full screen height */
  text-color: white;
  padding-top: 15%;
`

export default function CriarUsuarioModal() {
  const [open, setOpen] = React.useState(false)
  const [newUser, setNewUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleData = () => {
    console.log('Usuário:', newUser)
    console.log('Senha:', password)
    console.log('Confirmação:', confirmPassword)

    // Aqui você pode adicionar validação e chamada à API
    if (!newUser || !password || !confirmPassword) {
      alert('Preencha todos os campos!')
      return
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!')
      return
    }

    const dados = {
    "username":newUser,
    "password":password,
    "email":email
  }

    // Chamada à API para criar usuário
return fetch('http://localhost:3000/inserirUsuario', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dados)
})
.then(response => {
  if (!response.ok) {
    return response.text().then(text => {
      throw new Error(`Erro ${response.status}: ${response.statusText}. ${text}`)
    })
  }
  return response.json()
})
.then(data => {
  handleClose()
  return data
})
.catch(err => {
  console.error('Erro ao cadastrar usuário:', err)
  throw err
})

     // Fecha o modal após sucesso
  }

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{
          marginTop: 1,
          width: '300px'
        }}
      >
        Cadastrar
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Container>
              <Typography gutterBottom variant="h5" component="div">
                Cadastro de usuário
              </Typography>

              <TextField
                id="standard-basic"
                label="Usuário"
                variant="standard"
                value={newUser}
                onChange={e => setNewUser(e.target.value)}
                sx={{
                  marginTop: 1.5,
                  width: '80%'
                }}
              />
              <TextField
                id="standard-basic"
                label="Email"
                type='email'
                variant="standard"
                value={email}
                onChange={e => setEmail(e.target.value)}
                sx={{
                  marginTop: 1.5,
                  width: '80%'
                }}
              />
              <TextField
                id="standard-basic"
                label="Senha"
                type="password"
                variant="standard"
                value={password}
                onChange={e => setPassword(e.target.value)}
                sx={{
                  marginTop: 1.5,
                  width: '80%'
                }}
              />
              <TextField
                id="standard-basic"
                label="Digite a senha novamente"
                type="password"
                variant="standard"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                sx={{
                  marginTop: 1.5,
                  width: '80%'
                }}
              />

              <Button
                variant="text"
                onClick={handleData}
                sx={{
                  marginTop: 3
                }}
              >
                Cadastrar
              </Button>
              <Button onClick={handleClose} variant="text">
                Fechar
              </Button>
            </Container>{' '}
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
