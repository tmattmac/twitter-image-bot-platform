import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/auth/isAuthenticated')
            .then(response => {
                setUser(response.data.user);
                setLoading(false);
            })
            .catch(console.error);
    }, []);


    return (
        <div>
            {!user && <a href="/auth">Log in</a>}
            {user && <p>{user.id}</p>}
        </div>
    )
}

export default Home;