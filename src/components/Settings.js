import React from 'react';
import ColorPicker from 'material-ui-color-picker';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Palette from '@material-ui/icons/Palette';
import Typography from '@material-ui/core/Typography';

const Settings = ({
  posterWidthInches,
  setPosterWidthInches,
  posterHeightInches,
  setPosterHeightInches,
  cols,
  setColsInput,
  spacing,
  setSpacing,
  backgroundColor,
  setBackgroundColor
}) => (
  <Grid container spacing={3}>
    <Grid item xs={6}>
      <TextField
        label="Poster Width (Inches)"
        fullWidth
        value={posterWidthInches}
        onChange={event => setPosterWidthInches(parseInt(event.target.value))}
        type='number'
      />
    </Grid>

    <Grid item xs={6}>
      <TextField
        label="Poster Height (Inches)"
        fullWidth
        value={posterHeightInches}
        onChange={event => setPosterHeightInches(parseInt(event.target.value))}
        type='number'
      />
    </Grid>

    <Grid item xs={12}>
      <TextField
        label="Columns"
        fullWidth
        value={cols}
        onChange={event => setColsInput(parseInt(event.target.value))}
        type='number'
      />
    </Grid>

    <Grid item xs={12}>
      <TextField
        label="Spacing"
        fullWidth
        value={spacing}
        onChange={event => setSpacing(parseInt(event.target.value))}
        type='number'
      />
    </Grid>

    <Grid item xs={12}>
      <ColorPicker
        value={backgroundColor}
        onChange={setBackgroundColor}
        TextFieldProps={{
          value: backgroundColor,
          variant: "outlined",
          label: "Background Color",
          fullWidth: true
        }}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment:
            <InputAdornment position="end">
              <Palette style={{ color: backgroundColor }} />
            </InputAdornment>,
        }}
      />
      {
        backgroundColor === '#ffffff' && (
          <Typography variant='body1'>
            Please don't use true white (#ffffff). It will screw up the cropping algorithm. May I suggest #fffffe?
          </Typography>
        )
      }
    </Grid>
  </Grid>
);

export default Settings;
