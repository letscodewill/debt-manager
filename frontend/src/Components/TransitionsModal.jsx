import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { TextField } from '@mui/material'
import styled from 'styled-components'
import SelectLabelsCategory from './SelectLabelsCategory'
import { useContext } from 'react'
import { Context } from '../contexts/Context'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: "auto",
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
  text-color: white;
`

export default function TransitionsModal() {
  const { category, setCategory } = useContext(Context)
  const [open, setOpen] = React.useState(false)
  const [descricao, setDescricao] = React.useState('')
  const [valor, setValor] = React.useState('')
  
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setDescricao('')
    setValor('')
    setCategory('')
  }

  const handleSubmit = () => {
    // Validação básica
    if (!descricao.trim() || !valor || !category) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    const novaDivida = {
      descricao: descricao.trim(),
      valor: parseFloat(valor),
      categoria: category,
      data: new Date().toISOString()
    }

    console.log('Nova dívida:', novaDivida)
    
    // Aqui você pode fazer a requisição para a API
    // fetch('http://localhost:3000/dividas', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(novaDivida)
    // })
    
    handleClose()
  }

  return (
    <div>
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
            <Container>
              <Typography gutterBottom variant="h5" component="div" sx={{ mb: 3 }}>
                Cadastro de dívida
              </Typography>

              <TextField
                label="Descrição"
                variant="standard"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              
              <TextField
                label="Valor"
                variant="standard"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                type="number"
                fullWidth
                sx={{ mb: 3 }}
                required
                inputProps={{ step: "0.01" }}
              />
              
              <SelectLabelsCategory />
            
              
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 2, mb: 1 }}
                fullWidth
              >
                Cadastrar
              </Button>
              
              <Button
                onClick={handleClose}
                variant="outlined"
                fullWidth
              >
                Fechar
              </Button>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}