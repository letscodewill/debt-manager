// Components/Users.jsx
import { useState, useContext } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { AuthContext } from '../contexts/AuthContext'
import ModalEditUser from './ModalEditUser'

const UserCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}))

const StatusIndicator = styled(Box)(({ active, theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  padding: `${theme.spacing(0.25)} ${theme.spacing(1)}`,
  borderRadius: theme.spacing(0.5),
  backgroundColor: active
    ? theme.palette.success.light + '30'
    : theme.palette.error.light + '30',
  color: active ? theme.palette.success.dark : theme.palette.error.dark,
  fontSize: '0.75rem',
  fontWeight: 500
}))

export default function UsersList({ usuario, onUserUpdated }) {
  const { token, logout } = useContext(AuthContext)
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [modalEditOpen, setModalEditOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  // Se usuario for string, converte para objeto
  const user =
    typeof usuario === 'string'
      ? {
          name: usuario,
          username: usuario,
          email: `${usuario.toLowerCase()}@email.com`,
          activated: true,
          role: 'user'
        }
      : usuario

  const handleChange = event => {
    setChecked(event.target.checked)
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleEdit = () => {
    console.log('Abrindo modal para editar:', user)
    setModalEditOpen(true)
  }

  const handleUserUpdated = () => {
    if (onUserUpdated) {
      onUserUpdated()
    }
  }

  // Função para alternar o status activated
  const handleToggleActivated = async () => {
    if (!user.id && !user._id) {
      setSnackbar({
        open: true,
        message: 'Usuário não possui ID válido',
        severity: 'error'
      })
      return
    }

    if (!token) {
      setSnackbar({
        open: true,
        message: 'Você precisa estar logado para esta ação',
        severity: 'error'
      })
      logout()
      return
    }

    const newActivatedStatus = !user.activated
    const action = newActivatedStatus ? 'ativar' : 'desativar'

    if (
      !window.confirm(
        `Tem certeza que deseja ${action} o usuário ${user.username}?`
      )
    ) {
      return
    }

    setUpdating(true)

    try {
      const userId = user.id || user._id
      const url = `http://localhost:3000/usuarios/${userId}`

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          activated: newActivatedStatus,
          username: user.username
        })
      })

      console.log('Resposta do toggle:', {
        status: response.status,
        statusText: response.statusText
      })

      if (response.status === 401) {
        setSnackbar({
          open: true,
          message: 'Sessão expirada. Faça login novamente.',
          severity: 'error'
        })
        logout()
        return
      }

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || `Erro ${response.status}`)
      }

      const result = await response.json()

      setSnackbar({
        open: true,
        message: `Usuário ${user.name} ${
          newActivatedStatus ? 'ativado' : 'desativado'
        } com sucesso!`,
        severity: 'success'
      })

      // Atualiza a lista
      if (onUserUpdated) {
        setTimeout(() => {
          onUserUpdated()
        }, 1000)
      }
    } catch (error) {
      console.error('Erro ao alterar status:', error)

      setSnackbar({
        open: true,
        message: `Erro: ${error.message}`,
        severity: 'error'
      })
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Tem certeza que deseja excluir o usuário ${user.username}?`
      )
    ) {
      return
    }

    if (!user.id && !user._id) {
      setSnackbar({
        open: true,
        message: 'Usuário não possui ID válido para exclusão',
        severity: 'error'
      })
      return
    }

    if (!token) {
      setSnackbar({
        open: true,
        message: 'Você precisa estar logado para esta ação',
        severity: 'error'
      })
      logout()
      return
    }

    setLoading(true)

    try {
      const userId = user.id || user._id

      const response = await fetch(
        `http://localhost:3000/deletarUsuario/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log('Resposta da exclusão:', {
        status: response.status,
        statusText: response.statusText
      })

      if (response.status === 401) {
        setSnackbar({
          open: true,
          message: 'Sessão expirada. Faça login novamente.',
          severity: 'error'
        })
        logout()
        return
      }

      if (response.status === 403) {
        setSnackbar({
          open: true,
          message: 'Você não tem permissão para excluir usuários.',
          severity: 'error'
        })
        return
      }

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(
          errorText || `Erro ${response.status}: ${response.statusText}`
        )
      }

      const result = await response.json()

      setSnackbar({
        open: true,
        message: `Usuário ${user.name} excluído com sucesso!`,
        severity: 'success'
      })

      // Chama função para atualizar a lista
      if (onUserUpdated) {
        setTimeout(() => {
          onUserUpdated()
        }, 1000)
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error)

      setSnackbar({
        open: true,
        message: `Erro ao excluir usuário: ${error.message}`,
        severity: 'error'
      })
    } finally {
      setLoading(false)
      setChecked(false)
    }
  }

  return (
    <>
      <UserCard>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={1}>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleChange}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              disabled={loading || updating}
            />
          </Grid>

          <Grid item xs={1}>
            <Avatar
              sx={{
                bgcolor:
                  user.role === 'admin' ? 'secondary.main' : 'primary.main',
                opacity: loading || updating ? 0.5 : 1
              }}
            >
              {user.name?.charAt(0) || user.username?.charAt(0) || 'U'}
            </Avatar>
          </Grid>

          <Grid item xs={2}>
            <Box>
              <Typography variant="subtitle1" fontWeight="medium">
                {user.name || user.username}
                {(loading || updating) && ' (processando...)'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                @{user.username}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body2">{user.email}</Typography>
          </Grid>

          <Grid item xs={2}>
            <Chip
              label={user.role || 'Usuário'}
              size="small"
              color={user.role === 'admin' ? 'secondary' : 'default'}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={2}>
            <Tooltip
              title={user.activated ? 'Usuário ativo' : 'Usuário inativo'}
            >
              <StatusIndicator active={user.activated}>
                {user.activated ? (
                  <>
                    <ToggleOnIcon fontSize="small" />
                    Ativo
                  </>
                ) : (
                  <>
                    <ToggleOffIcon fontSize="small" />
                    Inativo
                  </>
                )}
              </StatusIndicator>
            </Tooltip>
          </Grid>

          <Grid item xs={2} sx={{ textAlign: 'right' }}>
            {checked && (
              <ButtonGroup
                variant="outlined"
                size="small"
                disabled={loading || updating}
              >
                <Tooltip title="Alternar status">
                  <Button
                    onClick={handleToggleActivated}
                    disabled={loading || updating}
                    color={user.activated ? 'warning' : 'success'}
                    sx={{ minWidth: 'auto', px: 1 }}
                  >
                    {user.activated ? 'Desativar' : 'Ativar'}
                  </Button>
                </Tooltip>

                <Tooltip title="Editar">
                  <Button 
                    onClick={handleEdit} 
                    disabled={loading || updating}
                    sx={{ minWidth: 'auto', px: 1 }}
                  >
                    <EditIcon fontSize="small" />
                  </Button>
                </Tooltip>

                <Tooltip title="Excluir">
                  <Button
                    onClick={handleDelete}
                    color="error"
                    disabled={loading || updating}
                    sx={{ minWidth: 'auto', px: 1 }}
                  >
                    <DeleteForeverIcon fontSize="small" />
                  </Button>
                </Tooltip>
              </ButtonGroup>
            )}
          </Grid>
        </Grid>

        {checked && (user.id || user._id) && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px dashed #e0e0e0' }}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography variant="caption" color="text.secondary">
                  ID: {user.id || user._id}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="caption" color="text.secondary">
                  Status: {user.activated ? '✅ Ativo' : '❌ Inativo'}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="caption" color="text.secondary">
                  {user.createdAt
                    ? `Criado: ${new Date(user.createdAt).toLocaleDateString()}`
                    : ''}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </UserCard>

      {/* Modal de Edição */}
      <ModalEditUser
        open={modalEditOpen}
        onClose={() => setModalEditOpen(false)}
        user={user}
        onUserUpdated={handleUserUpdated}
      />

      {/* Snackbar único */}
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