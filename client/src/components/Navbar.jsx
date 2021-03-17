

const Navbar = ({ user, handleLogout }) => {
    return (
        <div>
        <p>{user?.id || 'No one logged in'}</p>
        {user ?
            <a href="#" onClick={handleLogout}>Log out</a>
            :
            <a href="/auth">Log in</a>
        }
        </div>
    )
}

export default Navbar;