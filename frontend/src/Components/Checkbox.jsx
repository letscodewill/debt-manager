import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

export default function ControlledCheckbox({...props}) {
 

  return (
    <Checkbox sx={{marginTop: -2}}
      checked={props.checked}
      onChange={props.onChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}
