import React from 'react';
import { TextField, Grid } from '@mui/material';

const URLForm = ({ index, data, handleChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Original URL"
          value={data.url}
          onChange={(e) => handleChange(index, 'url', e.target.value)}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          fullWidth
          label="Validity (mins)"
          value={data.validity}
          onChange={(e) => handleChange(index, 'validity', e.target.value)}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          fullWidth
          label="Preferred Shortcode"
          value={data.shortcode}
          onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default URLForm;
