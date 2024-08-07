import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../images/default.png';
import { Link } from 'react-router-dom';



const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function TopBar({ imageUrl }) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    const savedImage = localStorage.getItem('savedImage');
    const avatarSrc = savedImage ? savedImage : defaultAvatar;

    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: '#25C6FF' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'Comic Sans MS',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Ireonada
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={handleBackClick}
                            >
                                <ArrowBackIosIcon />
                            </IconButton>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'Comic Sans MS',
                                fontWeight: 500,
                                fontSize: 20,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Ireonada
                        </Typography>

                        <Box href="/character" sx={{ flexGrow: 0 }}>
                            <Link to="/character" style={{ textDecoration: 'none' }}>
                                <Avatar alt="AI Character" src={avatarSrc} />
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

export default TopBar;
