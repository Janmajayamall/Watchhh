import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

  cssLabel: {
    color: '#ffffff',
    '&$cssFocused': {
      color: `#ffffff`,
    },
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `#ffffff !important`,
    },
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#ffffff !important',
  },

  input: {
    fontSize: 20,
    color: '#ffffff',
  },
});

function TextInput({ classes, label, placeholder, value, onChange }) {
  return (
    <TextField
      label={label}
      className={classes.textField}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        classes: {
          root: classes.cssLabel,
          focused: classes.cssFocused,
        },
      }}
      InputProps={{
        classes: {
          root: classes.cssOutlinedInput,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
          input: classes.input,
        },
      }}
      style={{ width: '99%' }}
    />
  );
}

export default withStyles(styles)(TextInput);
