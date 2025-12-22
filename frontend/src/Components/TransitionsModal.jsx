import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { TextField, Alert, Snackbar, CircularProgress } from '@mui/material'
import styled from 'styled-components'
import SelectLabelsCategory from './SelectLabelsCategory'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import { AuthContext } from '../contexts/AuthContext'
// Importações do DatePicker
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import ptBR from 'date-fns/locale/pt-BR'

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
  maxHeight: '80vh',
  overflowY: 'auto'
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-color: white;
  gap: 16px;
`

export default function TransitionsModal() {
  const { category, setCategory, fetchDespesas, setDespesas } =
    useContext(Context)
  const { token, user, logout } = useContext(AuthContext)
  console.log(user)

  const [open, setOpen] = React.useState(false)
  const [descricao, setDescricao] = React.useState('')
  const [valor, setValor] = React.useState('')
  const [categoria, setCategoria] = React.useState('')
  const [dataDespesa, setDataDespesa] = React.useState(new Date()) // Novo estado para data
  const [loading, setLoading] = React.useState(false)
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleOpen = () => {
    if (!token) {
      setSnackbar({
        open: true,
        message: 'Você precisa estar logado para adicionar uma dívida!',
        severity: 'warning'
      })
      return
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setDescricao('')
    setValor('')
    setCategoria('')
    setDataDespesa(new Date()) // Reseta para data atual
    if (setCategory) setCategory('')
    setLoading(false)
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleSubmit = async () => {
    // Validação básica
    if (!descricao.trim()) {
      setSnackbar({
        open: true,
        message: 'Por favor, informe uma descrição!',
        severity: 'error'
      })
      return
    }

    if (!valor || parseFloat(valor) <= 0) {
      setSnackbar({
        open: true,
        message: 'Por favor, informe um valor válido!',
        severity: 'error'
      })
      return
    }

    const categoriaFinal = categoria || category
    if (!categoriaFinal) {
      setSnackbar({
        open: true,
        message: 'Por favor, selecione uma categoria!',
        severity: 'error'
      })
      return
    }

    if (!token) {
      setSnackbar({
        open: true,
        message: 'Sessão expirada. Faça login novamente.',
        severity: 'error'
      })
      logout()
      handleClose()
      return
    }

    const novaDespesa = {
      descricao: descricao.trim(),
      valor: parseFloat(valor),
      categoria: categoriaFinal,
      data: dataDespesa.toISOString(), // ⬅️ Usa a data selecionada no formato ISO
      userId: user.id
    }

    console.log('Enviando despesa:', novaDespesa); // Para debug

    setLoading(true)

    try {
      const response = await fetch('http://localhost:3000/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(novaDespesa)
      })

      if (response.status === 401) {
        setSnackbar({
          open: true,
          message: 'Sessão expirada. Faça login novamente.',
          severity: 'error'
        })
        logout()
        handleClose()
        return
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.message || `Erro ${response.status}: ${response.statusText}`
        )
      }

      const data = await response.json()

      // ATUALIZAÇÃO IMPORTANTE: Busca os dados atualizados da API
      await fetchDespesas(token, user.id)

      setSnackbar({
        open: true,
        message: 'Despesa cadastrada com sucesso!',
        severity: 'success'
      })

      // Limpa os campos
      setDescricao('')
      setValor('')
      setCategoria('')
      setDataDespesa(new Date())
      if (setCategory) setCategory('')

      // Fecha o modal após sucesso
      setTimeout(() => {
        handleClose()
      }, 1500)
    } catch (error) {
      console.error('Erro ao cadastrar despesa:', error)

      setSnackbar({
        open: true,
        message: `Erro ao cadastrar: ${error.message}`,
        severity: 'error'
      })

      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        +
      </Button>

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
            {/* Envolva todo o conteúdo com LocalizationProvider */}
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <Container>
                <Typography variant="h5" component="h2" gutterBottom>
                  Cadastro de Dívida
                </Typography>

                <TextField
                  label="Descrição"
                  variant="standard"
                  value={descricao}
                  onChange={e => setDescricao(e.target.value)}
                  fullWidth
                  required
                  placeholder="Ex: Conta de luz, Supermercado, etc."
                  disabled={loading}
                />

                <TextField
                  label="Valor (R$)"
                  variant="standard"
                  value={valor}
                  onChange={e => setValor(e.target.value)}
                  type="number"
                  fullWidth
                  required
                  inputProps={{
                    step: '0.01',
                    min: '0.01'
                  }}
                  placeholder="0,00"
                  disabled={loading}
                />

                {/* DatePicker adicionado aqui */}
                <Box sx={{ width: '100%', mt: 1 }}>
                  <DatePicker
                    label="Data da despesa"
                    value={dataDespesa}
                    onChange={(novaData) => setDataDespesa(novaData)}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        variant="standard"
                        fullWidth
                        required
                        disabled={loading}
                      />
                    )}
                    inputFormat="dd/MM/yyyy"
                    disableFuture={false} // Permite datas futuras se necessário
                  />
                </Box>

                <SelectLabelsCategory
                  value={categoria}
                  onChange={setCategoria}
                  label="Categoria"
                  required={true}
                  disabled={loading}
                />

                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    width: '100%',
                    mt: 2
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    fullWidth
                    sx={{ py: 1 }}
                    disabled={loading}
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : null
                    }
                  >
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                  </Button>

                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    fullWidth
                    sx={{ py: 1 }}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                </Box>

                {token && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, fontSize: '0.7rem' }}
                  >
                    Autenticado com token: {token.substring(0, 10)}...
                  </Typography>
                )}
              </Container>
            </LocalizationProvider>
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