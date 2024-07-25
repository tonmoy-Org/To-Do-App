import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const Footer = () => {

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: 'rgb(0, 47, 74)',
                color: 'white'
            }}
        >
            <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="inherit" sx={{ mt: 1 }}>
                    Designed and developed by Md. Tanvir Hasan Tonmoy
                </Typography>
                <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
                    Built with ❤️ using Redux, React, and Mongoose
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
