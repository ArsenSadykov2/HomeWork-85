import {AppBar, Container, styled, Toolbar, Typography, Button} from "@mui/material";
import {NavLink} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../../features/Users/userSlice.ts";

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});

const AppToolbar = () => {
    const user = useAppSelector(selectUser);

    return (
        <AppBar position="sticky" sx={{
            mb: 2,
            backgroundColor: '#a8e6cf',
            color: '#2d3436'
        }}>
            <Toolbar>
                <Container maxWidth="xl">
                    <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            <Link to="/">My PLaylist</Link>
                        </Typography>
                        {user ?
                            (<span>User Menu</span>)
                            :
                            (<>
                                <Button component={NavLink} to='/register' color="inherit">Sing Up</Button>
                                <Button component={NavLink} to='/login' color="inherit">Sing In</Button>
                            </>)
                        }
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    );
};


export default AppToolbar;