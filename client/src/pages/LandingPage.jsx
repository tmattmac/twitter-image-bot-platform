import { useState, useEffect } from 'react';
import axios from 'axios';

function LandingPage() {


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
            {data && (
                data.map(image => {
                    return <img src={image.url} alt={image.id} key={image.id} />;
                })
            )}
            <p>{successMsg}</p>
        </div>
    )
}

export default LandingPage;