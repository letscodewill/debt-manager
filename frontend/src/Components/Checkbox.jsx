import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

export default function ControlledCheckbox({...props}) {
 

  return (
    <Checkbox
      checked={props.checked}
      onChange={props.onChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}
