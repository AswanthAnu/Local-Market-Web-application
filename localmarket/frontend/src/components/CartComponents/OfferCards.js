import React from 'react';
import { Card, Stack, Typography } from '@mui/material';
import CardMedia from './CardImage';
import CardProductName from './CardProductName';

const OfferCards = ({ freeitem, index }) => {
  return (
    <Card key={index} sx={{ margin: '10px' }}>
      <Stack
        direction="row"
        sx={{
          '@media (max-width: 600px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Stack
          flex={1}
          justifyContent="space-between"
          padding={1}
          backgroundColor="#f5f5f5"
          border="1px solid #ccc"
          borderRadius="0px"
          sx={{
            '@media (max-width: 600px)': {
              flex: 0,
              marginBottom: '10px',
            },
          }}
        >
          <CardMedia freeitem={freeitem} index={index} />
        </Stack>

        <Stack
          flex={1}
          justifyContent="space-between"
          padding={2}
          paddingTop={4}
          sx={{
            '@media (max-width: 600px)': {
              padding: 1,
              paddingTop: 2,
            },
          }}
        >
          <CardProductName freeitem={freeitem} />
        </Stack>

        <Stack
          flex={1}
          justifyContent="space-between"
          padding={2}
          sx={{
            '@media (max-width: 600px)': {
              padding: 1,
            },
          }}
        >
          <Typography>Free</Typography>
        </Stack>

        <Stack
          flex={1}
          justifyContent="space-between"
          padding={2}
          paddingTop={4}
          sx={{
            '@media (max-width: 600px)': {
              padding: 1,
            },
          }}
        >
          
        </Stack>
      </Stack>
    </Card>
  );
};

export default OfferCards;
