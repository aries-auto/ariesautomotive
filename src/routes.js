import React from 'react';
import Router from 'react-routing/src/Router';
import fetch from './core/fetch';
import App from './components/App';
import Product from './components/Product';
import Home from './components/Home';
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

        const categoryResponse = await fetch('http://api.curtmfg.com/v3/category?brandID=3&key=9300f7bc-2ca6-11e4-8758-42010af0fd79', {
            method: 'get',
        });

        try {
            let years = [];
            const vehicleResponse = await yearsResponse.json();
            if (vehicleResponse.available_years !== undefined) {
                years = vehicleResponse.available_years;
            }

            state.context.years = years;

            state.context.categories = await categoryResponse.json() || [];
        } catch (e) {
            state.context.error = e;
        }

        const component = await next();
        return component && <App context={state.context}>{component}</App>;
    });

    on('/product/:id', async (state) => {
        try {
            const url = `http://api.curtmfg.com/v3/part/${state.params.id}?key=9300f7bc-2ca6-11e4-8758-42010af0fd79`;
            const partResponse = await fetch(url, {
                method: 'get',
            });

            state.context.part = await partResponse.json();
        } catch (e) {
            state.context.error = e;
        }

        return <Product part={state.context.part} />;
    });

    on('/category/:id/:title', async (state) => {
        try {
            const url = `http://api.curtmfg.com/v3/category/${state.params.id}?key=9300f7bc-2ca6-11e4-8758-42010af0fd79`;
            const catResponse = await fetch(url, {
                method: 'get',
            });

            state.context.category = await catResponse.json();
        } catch (e) {
            state.context.error = e;
        }

        console.log(state.context.category);
        return <Product part={state.context.part} />;
    });

    on('/category/:id/:title/:sub', async (state) => {
        try {
            const url = `http://api.curtmfg.com/v3/category/${state.params.id}?key=9300f7bc-2ca6-11e4-8758-42010af0fd79`;
            const catResponse = await fetch(url, {
                method: 'get',
            });

            state.context.category = await catResponse.json();
        } catch (e) {
            state.context.error = e;
        }

        console.log(state.context.category, state.context.error);
        return <Product part={state.context.part} />;
    });

    on('/', async (state) => {
        state.context.featuredProducts = [];
        try {
            const url = `http://api.curtmfg.com/v3/part/featured?brandID=3&key=9300f7bc-2ca6-11e4-8758-42010af0fd79`;
            const featResponse = await fetch(url, {
                method: 'get',
            });

            state.context.featuredProducts = await featResponse.json();
        } catch (e) {
            state.context.error = e;
        }

        return <Home featuredProducts={state.context.featuredProducts} />;
    });

    on('error', (state, error) => state.statusCode === 404 ?
        <App context={state.context} error={error}><NotFoundPage /></App> :
        <App context={state.context} error={error}><ErrorPage /></App>
    );
});

export default router;
