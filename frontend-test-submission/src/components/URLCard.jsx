import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Link,
} from '@mui/material';

const URLCard = ({ shortLink, expiryDate }) => {
  return (
    <Card
      elevation={1}
      sx={{
        borderRadius: 2,
        backgroundColor: '#fafafa',
        border: '1px solid #e0e0e0',
      }}
    >
      <CardContent>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Shortened Link
          </Typography>
          <Link
            href={shortLink}
            target="_blank"
            underline="hover"
            color="primary"
            sx={{ fontSize: '1rem', fontWeight: 600 }}
          >
            {shortLink}
          </Link>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Expires on: {new Date(expiryDate).toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default URLCard;
