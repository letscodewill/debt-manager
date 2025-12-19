// Components/ModalEditUser.jsx
import { useState, useContext, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { 
  TextField, 
  Alert, 
  Snackbar, 
  CircularProgress,
  IconButton,
  InputAdornment
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { styled } from '@mui/material/styles'
import { AuthContext } from '../contexts/AuthContext'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: '80vh',
  overflowY: 'auto'
}

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  marginTop: theme.spacing(2)
}))

export default function ModalEditUser({ 
  open, 
  onClose, 
  user, 
  onUserUpdated 
}) {
  const { token } = useContext(AuthContext)
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  // Preenche o formulário quando o usuário muda
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        password: '',
        confirmPassword: ''
      })
      setErrors({})
    }
  }, [user])

  const handleClose = () => {
    setFormData({
      username: '',
      password: '',
      confirmPassword: ''
    })
    setErrors({})
    onClose()
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpa erro do campo ao digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Valida username
    if (!formData.username.trim()) {
      newErrors.username = 'Username é obrigatório'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username deve ter pelo menos 3 caracteres'
    }
    
    // Se senha foi preenchida, valida
    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'As senhas não conferem'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    if (!user?.id) {
      setSnackbar({
        open: true,
        message: 'ID do usuário não encontrado',
        severity: 'error'
      })
      return
    }

    if (!token) {
      setSnackbar({
        open: true,
        message: 'Você precisa estar logado para editar usuários',
        severity: 'error'
      })
      return
    }

    setLoading(true)

    try {
      // Prepara os dados para envio
      const dadosAtualizacao = {
        username: formData.username.trim()
      }
      
      // Inclui senha apenas se foi preenchida
      if (formData.password && formData.password.trim() !== '') {
        dadosAtualizacao.password = formData.password.trim()
      }

      console.log('Enviando atualização:', {
        userId: user.id,
        dados: dadosAtualizacao
      })

      const response = await fetch(`http://localhost:3000/usuarios/${user.id}`, {
        method: 'PUT', // ou PATCH se seu backend usa
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dadosAtualizacao)
      })

      console.log('Status da resposta:', response.status)

      // Tenta ler a resposta
      const responseText = await response.text()
      let result = {}
      
      try {
        result = responseText ? JSON.parse(responseText) : {}
      } catch {
        result = { message: responseText }
      }

      if (response.status === 401) {
        setSnackbar({
          open: true,
          message: 'Sessão expirada. Faça login novamente.',
          severity: 'error'
        })
        return
      }

      if (response.status === 404) {
        setSnackbar({
          open: true,
          message: 'Usuário não encontrado',
          severity: 'error'
        })
        return
      }

      if (!response.ok) {
        throw new Error(result.message || `Erro ${response.status}: ${response.statusText}`)
      }

      setSnackbar({
        open: true,
        message: result.message || 'Usuário atualizado com sucesso!',
        severity: 'success'
      })

      // Atualiza a lista de usuários
      if (onUserUpdated) {
        setTimeout(() => {
          onUserUpdated()
        }, 1000)
      }

      // Fecha o modal após sucesso
      setTimeout(() => {
        handleClose()
      }, 1500)

    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
      
      setSnackbar({
        open: true,
        message: `Erro: ${error.message}`,
        severity: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <>
      <Modal
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
            {/* Cabeçalho */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3
            }}>
              <Typography variant="h5" component="h2" fontWeight="bold">
                Editar Usuário
              </Typography>
              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            {user?.id && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                ID: {user.id}
              </Typography>
            )}

            <FormContainer>
              {/* Campo Username */}
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                disabled={loading}
                fullWidth
                variant="outlined"
                required
              />

              {/* Campo Senha */}
              <TextField
                label="Nova Senha (deixe em branco para manter a atual)"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password || 'Mínimo 6 caracteres'}
                disabled={loading}
                fullWidth
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              {/* Campo Confirmar Senha */}
              <TextField
                label="Confirmar Nova Senha"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                disabled={loading}
                fullWidth
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              {/* Informações */}
              <Alert severity="info" variant="outlined">
                <Typography variant="body2">
                  • Preencha a senha apenas se quiser alterá-la
                  <br />
                  • Username será atualizado imediatamente
                </Typography>
              </Alert>

              {/* Botões */}
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                mt: 2 
              }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  fullWidth
                  sx={{ py: 1.5 }}
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                >
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleClose}
                  disabled={loading}
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Cancelar
                </Button>
              </Box>
            </FormContainer>
          </Box>
        </Fade>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}