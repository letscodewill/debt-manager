import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { TextField, Alert, Snackbar, CircularProgress, Link } from '@mui/material'
import styled from 'styled-components'

// Reuse your existing style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

export default function ForgotPasswordModal() {
  const [open, setOpen] = React.useState(false)
  const [step, setStep] = React.useState(1) // Step 1: Email, Step 2: Code + New Pass
  const [loading, setLoading] = React.useState(false)
  
  // Form States
  const [email, setEmail] = React.useState('')
  const [code, setCode] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleOpen = () => setOpen(true)
  
  const handleClose = () => {
    setOpen(false)
    // Reset states after a delay so the user doesn't see it flicker
    setTimeout(() => {
      setStep(1)
      setEmail('')
      setCode('')
      setNewPassword('')
      setLoading(false)
    }, 500)
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // --- ACTION 1: Request the Code ---
  const handleSendCode = async () => {
    if (!email) {
      setSnackbar({ open: true, message: 'Digite seu email', severity: 'warning' })
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        setSnackbar({ open: true, message: 'Código enviado! Verifique seu email.', severity: 'success' })
        setStep(2) // Move to next step
      } else {
        throw new Error('Falha ao enviar email')
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Erro ao enviar código.', severity: 'error' })
    } finally {
      setLoading(false)
    }
  }

  // --- ACTION 2: Reset the Password ---
  const handleResetPassword = async () => {
    if (!code || !newPassword) {
      setSnackbar({ open: true, message: 'Preencha o código e a nova senha', severity: 'warning' })
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token: code, newPassword }) // 'token' matches backend
      })

      const data = await response.json()

      if (response.ok) {
        setSnackbar({ open: true, message: 'Senha alterada com sucesso! Faça login.', severity: 'success' })
        setTimeout(() => {
            handleClose()
        }, 2000)
      } else {
        throw new Error(data.error || 'Erro ao resetar senha')
      }
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Trigger Button (usually a text link) */}
      <Link 
        component="button" 
        variant="body2" 
        onClick={handleOpen}
        sx={{ textDecoration: 'none', cursor: 'pointer', mt: 1 }}
      >
        Esqueci minha senha
      </Link>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Container>
              <Typography variant="h5" component="h2" gutterBottom>
                {step === 1 ? 'Recuperar Senha' : 'Redefinir Senha'}
              </Typography>

              {/* STEP 1: Email Input */}
              {step === 1 && (
                <>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Digite seu email para receber um código de verificação.
                  </Typography>
                  <TextField
                    label="Seu Email"
                    variant="standard"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSendCode}
                    disabled={loading}
                    sx={{ mt: 2 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Enviar Código'}
                  </Button>
                </>
              )}

              {/* STEP 2: Code + New Password */}
              {step === 2 && (
                <>
                  <Alert severity="info" sx={{ width: '100%', mb: 2 }}>
                    Código enviado para: <b>{email}</b>
                  </Alert>
                  
                  <TextField
                    label="Código recebido (6 dígitos)"
                    variant="standard"
                    fullWidth
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  
                  <TextField
                    label="Nova Senha"
                    variant="standard"
                    type="password"
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    sx={{ mt: 2 }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleResetPassword}
                    disabled={loading}
                    sx={{ mt: 3 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Alterar Senha'}
                  </Button>

                  <Button 
                    onClick={() => setStep(1)} 
                    size="small" 
                    sx={{ mt: 1 }}
                  >
                    Voltar / Corrigir Email
                  </Button>
                </>
              )}

            </Container>
          </Box>
        </Fade>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={handleSnackbarClose}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}