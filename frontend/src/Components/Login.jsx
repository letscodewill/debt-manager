import {TextField, Button} from '@mui/material';
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* optional: full screen height */
  text-color: white;
`;

export default function Login(params) {
    return (
        <Container>
            <TextField id="standard-basic" label="Username" variant="standard" />
            <TextField id="standard-basic" label="Password" variant="standard" type='password'/>
            <Button variant="text" sx={{
                marginTop: 3,
            }}>Sign in</Button>
        </Container>
    )
}


