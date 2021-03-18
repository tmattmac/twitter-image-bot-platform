import { AppBar, Button } from '@material-ui/core';

const Navbar = ({ user, handleLogout }) => {

    return (
        <AppBar position="static">
        {user ?
            <Button onClick={handleLogout} color="inherit">{user.display_name} (Log out)</Button>
            :
            <Button href="/auth" color="inherit">Log in</Button>
        }
        </AppBar>
    )
}

export default Navbar;