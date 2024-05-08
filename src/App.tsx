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
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            <form>
                <ProcaptchaFrictionless config={config} />
            </form>
        </div>
    );
}
