# procaptcha-react-webpack

Demo showing how to use procaptcha react components with webpack. The `ProcaptchaFrictionless` component is used in a
simple React App. This component will require a normal user to complete a Proof-of-Work captcha, or an image captcha if
the user is likely to be a bot.

## Setup

```bash
npm install
```

Replace the site key in `src/App.js` with your own site key.

```typescript
    const config = {
        account: {
             // Enter your SITE_KEY here. This one is a demo key.
            address: '5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM',
        },
    };
```

## Run

```bash
npm run start
```

Go to http://localhost:9000 in your browser.
