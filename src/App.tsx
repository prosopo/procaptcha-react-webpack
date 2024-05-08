import './styles.css';
import React from 'react';
import { ProcaptchaFrictionless } from '@prosopo/procaptcha-frictionless';

export default function App() {
    const config = {
        account: {
            address: '5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM', // Enter your SITE_KEY here
        },
    };
    return (
        <div className="App">
            <h1>Prosopo Procaptcha React Demo</h1>
            <form>
                <ProcaptchaFrictionless config={config} />
            </form>
        </div>
    );
}
