import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function Login() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            alert(t('login_success'));
        } catch (error) {
            setError(t('error_login'));
        }
    };

    return (
        <div>
            <h1>{t('login_title')}</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('email')}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('password')}
            />
            <button onClick={handleLogin}>{t('login')}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login;
