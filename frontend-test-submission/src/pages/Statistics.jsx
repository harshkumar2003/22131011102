import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Divider,
  Chip,
} from '@mui/material';

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:8000/shorturls');
      const data = await res.json();
      setStats(data.urls || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={600} color="primary" align="center" gutterBottom>
        URL Usage Analytics
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Track when and where your links were accessed.
      </Typography>

      {loading ? (
        <Box mt={10} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : stats.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No statistics available yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {stats.map((item, idx) => (
            <Grid item xs={12} key={idx}>
              <Card elevation={4} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    /{item.shortcode}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }} color="text.secondary">
                    {item.originalUrl}
                  </Typography>
                  <Typography variant="body2">Created: {new Date(item.createdAt).toLocaleString()}</Typography>
                  <Typography variant="body2">Expires: {new Date(item.expiry).toLocaleString()}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Total Clicks: <strong>{item.clicks?.length || 0}</strong>
                  </Typography>

                  {item.clicks?.length > 0 && (
                    <Box mt={2}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }} color="text.secondary">
                        Click History:
                      </Typography>
                      {item.clicks.map((click, i) => (
                        <Box key={i} sx={{ mb: 2, px: 2, py: 1, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={4}>
                              <Typography variant="body2">Time: {new Date(click.timestamp).toLocaleString()}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Typography variant="body2">Referrer: {click.referrer || 'N/A'}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Typography variant="body2">Region: {click.region || 'Unknown'}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Stats;
