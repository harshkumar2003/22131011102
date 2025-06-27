import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Snackbar,
  Box,
  Divider,
  useMediaQuery,
  Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import URLForm from '../components/URLForm';
import URLCard from '../components/URLCard';
import { createShortURL } from '../api';
import log from '../utils/logger';

const MAX_INPUTS = 5;

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [inputs, setInputs] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (index, field, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = value;
    setInputs(updatedInputs);
  };

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    const newResults = [];
    const savedShortcodes = [];

    for (let i = 0; i < inputs.length; i++) {
      const { url, validity, shortcode } = inputs[i];

      if (!url || !validateURL(url)) {
        setError(`Invalid URL in Row ${i + 1}`);
        log("frontend", "error", "component", `Invalid URL at row ${i + 1}`);
        return;
      }

      if (validity && isNaN(validity)) {
        setError(`Validity must be a number in Row ${i + 1}`);
        log("frontend", "error", "component", `Invalid validity at row ${i + 1}`);
        return;
      }

      try {
        const res = await createShortURL({
          url,
          validity: validity ? parseInt(validity) : undefined,
          shortcode: shortcode || undefined,
        });

        newResults.push(res);

        const short = res.shortLink.split('/').pop();
        savedShortcodes.push({ shortcode: short });

        log("frontend", "info", "api", `Short URL created for row ${i + 1}`);
      } catch (err) {
        setError(`Failed to shorten URL in Row ${i + 1}`);
        log("frontend", "error", "api", `API failure at row ${i + 1}`);
        return;
      }
    }

    setResults(newResults);
    const existing = JSON.parse(localStorage.getItem('shortenedLinks')) || [];
    localStorage.setItem('shortenedLinks', JSON.stringify([...existing, ...savedShortcodes]));
  };

  const addRow = () => {
    if (inputs.length < MAX_INPUTS) {
      setInputs([...inputs, { url: '', validity: '', shortcode: '' }]);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: isMobile ? 2 : 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
           URL Shortener
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" mb={4}>
          Shorten up to 5 URLs at once. Add optional validity and shortcode.
        </Typography>

        <Grid container spacing={3}>
          {inputs.map((input, index) => (
            <Grid item xs={12} key={index}>
              <URLForm index={index} data={input} handleChange={handleChange} />
            </Grid>
          ))}
        </Grid>

        <Box mt={2} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            onClick={addRow}
            disabled={inputs.length >= MAX_INPUTS}
          >
            + Add URL
          </Button>
        </Box>

        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 5, py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
            onClick={handleSubmit}
          >
            Shorten All URLs
          </Button>
        </Box>
      </Paper>

      {results.length > 0 && (
        <Box mt={6}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h5" fontWeight="medium" mb={2} textAlign="left">
            🔍 Shortened Results
          </Typography>

          <Grid container spacing={2}>
            {results.map((res, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <URLCard shortLink={res.shortLink} expiry={res.expiry} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError('')}
        message={error}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default Home;
