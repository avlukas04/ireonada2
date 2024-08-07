import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';



const theme = createTheme();

function BottomIcons() {
    const currLocation= useLocation()

    const getPath = (path) => {
        switch (path) {
            case '/calling':
                return 1;
            case '/calling1':
                return 1;
            case '/':
                return 0;
            case '/character':
                return 2;
            case '/character2':
                return 2
            case '/character3':
                return 2
            case '/character4':
                return 2
            case '/character5':
                return 2
            case '/bedtime':
                return 3;
           
            default:
                return 0;
        }
    }

    const [value, setValue] = React.useState(getPath(currLocation.pathname));

    return (
        <div>
    
            <ThemeProvider theme={theme}>

                <Box sx={{ width: 500 }}>
                    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        >
                            <BottomNavigationAction href="/" label="Home" icon={<HomeIcon />} />
                            <BottomNavigationAction href="/calling" label="Alarm" icon={<AccessAlarmIcon />} />
                            <BottomNavigationAction href="/character" label="Characters" icon={<PersonIcon />} />
                            <BottomNavigationAction href="/bedtime" label="Storytime" icon={<AutoStoriesRoundedIcon />} />
                        </BottomNavigation>
                    </Paper>
                </Box>
            </ThemeProvider>

        </div>
    )
}

export default BottomIcons
