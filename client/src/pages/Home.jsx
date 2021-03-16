import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        axios.get('/auth/isAuthenticated')
            .then(response => {
                setUser(response.data.user);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    const handleUpload = (e) => {
        const formData = new FormData();

        formData.append('file', e.target.files[0]);
        axios.post('/api/images', formData).then(() => setSuccessMsg('file uploaded'));
    }

    const handleLogout = (e) => {
        e.preventDefault();
        axios.post('/auth/logout')
            .then(response => {
                setUser(null);
                setSuccessMsg(response.data.message);
            })
            .catch(console.error);
    }


    return (
        <div>
            {!user && <a href="/auth">Log in</a>}
            {user && (
                <div>
                    <p>{user.id}</p>
                    <p><button onClick={handleLogout}>Log out</button></p>
                    <form>
                        <input type="file" onChange={handleUpload} value={null} />
                    </form>
                </div>
            )}
            <p>{successMsg}</p>
        </div>
    )
}

export default Home;