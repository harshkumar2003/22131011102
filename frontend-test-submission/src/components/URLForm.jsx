import React from 'react';
import { TextField, Grid, Paper } from '@mui/material';

const URLForm = ({ index, data, onChange }) => {
  const handleChange = (field, value) => {
    const updated = { ...data, [field]: value };
    onChange(index, updated);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        backgroundColor: '#fefefe',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Original URL"
            fullWidth
            required
            value={data.url}
            onChange={(e) => handleChange('url', e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Validity (mins)"
            type="number"
            fullWidth
            value={data.validity}
            onChange={(e) => handleChange('validity', e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Custom Shortcode"
            fullWidth
            value={data.shortcode}
            onChange={(e) => handleChange('shortcode', e.target.value)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default URLForm;
