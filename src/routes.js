import React from 'react';
import Router from 'react-routing/src/Router';
import fetch from './core/fetch';
import App from './components/App';
import Product from './components/Product';
import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

const router = new Router(on => {
    on('*', async (state, next) => {
        const yearsResponse = await fetch('https://goapi.curtmfg.com/vehicle/mongo/allCollections?key=883d4046-8b96-11e4-9475-42010af00d4e', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: '{}',
        });

        const vehicleResponse = await yearsResponse.json();
        let years = [];
        if (vehicleResponse.available_years !== undefined) {
            years = vehicleResponse.available_years;
        }

        state.context.years = years;

        const component = await next();
        return component && <App context={state.context}>{component}</App>;
    });

    on('/contact', async () => <ContactPage />);

    on('/login', async () => <LoginPage />);

    on('/register', async () => <RegisterPage />);

    on('/product', async () => {
        let part = {};

        return part && <Product product={part} />;
    });

    on('*', async () => {
        return {} && <ContentPage />;
    });

    on('error', (state, error) => state.statusCode === 404 ?
        <App context={state.context} error={error}><NotFoundPage /></App> :
        <App context={state.context} error={error}><ErrorPage /></App>
    );
});

export default router;
