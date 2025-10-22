import ActionAreaCard from "./ActionAreaCard"
import Grid from '@mui/material/Grid';
import BasicCard from './BasicCard'
import DropDown from './DropDown'
import Titles from "./Titles";
import * as React from 'react';
import DespesaGrid from "./DespesaGrid";



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
            <Grid size={12}>
                <Titles />
            </Grid>
           
        </Grid>
    </div>
}