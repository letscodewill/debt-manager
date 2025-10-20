import ActionAreaCard from "./ActionAreaCard"
import Grid from '@mui/material/Grid';
import BasicCard from './BasicCard'
import DropDown from './DropDown'


export default function Panel() {
    return <div>
        <Grid container spacing={2}>
            <Grid size={8}>
                <BasicCard />
                <DropDown />
            </Grid>
            <Grid size={4}>
                <ActionAreaCard />
            </Grid>
            <Grid size={8}>
                <BasicCard />
            </Grid>
            <Grid size={4}>
                <ActionAreaCard />
            </Grid>
        </Grid>
    </div>
}