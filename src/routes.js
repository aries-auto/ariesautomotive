import React from 'react';
import Router from 'react-routing/src/Router';
import fetch from './core/fetch';
import App from './components/App';
import Product from './components/Product';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
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
            const vehicleResponse = await yearsResponse.json();
            if (vehicleResponse.available_years !== undefined) {
                state.context.years = vehicleResponse.available_years;
            }

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

        return <Product part={state.context.part} />;
    });

    on('/search/:term', async (state) => {
        try {
            const searchResponse = await fetch(`http://api.curtmfg.com/v3/search/${state.params.term}?key=9300f7bc-2ca6-11e4-8758-42010af0fd79&brandID=3`);

            state.context.searchResult = await searchResponse.json();
        } catch (e) {
            state.context.error = e;
        }

        return <SearchResults context={state.context} />;
    });

    on('/', async (state) => {
        state.context.featuredProducts = [];
        state.context.testimonials = [];
        state.context.carouselImages = [
            {
                image: 'http://storage.googleapis.com/aries-website/hero-images/jeep.png',
                text: 'Never Fear the Uncertain Road',
                button_text: 'VIEW BULL BARS',
                link: '/category/332',
                order: 5,
                styles: {
                    backgroundImage: 'url(http://storage.googleapis.com/aries-website/hero-images/jeep.png)',
                },
            }, {
                image: 'https://storage.googleapis.com/aries-website/hero-images/GrandCherokee.png',
                text: 'Find Out What It Means to Be a Pro',
                button_text: 'VIEW PRO SERIES',
                link: '/category/331',
                order: 2,
                styles: {
                    backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/GrandCherokee.png)',
                },
            }, {
                image: 'https://storage.googleapis.com/aries-website/hero-images/JeepWrangler2015.png',
                text: 'Choose Your Configuration and Start Customizing',
                button_text: 'VIEW MODULAR BUMPERS',
                link: '/category/324',
                order: 3,
                styles: {
                    backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/JeepWrangler2015.png)',
                },
            }, {
                image: 'https://storage.googleapis.com/aries-website/hero-images/Floor%20Liner%20-%20Grey%20(1).jpg',
                text: 'ARIES Unveils StyleGuard™ as New Name for Floor Liners',
                button_text: 'READ MORE',
                link: '/news/47',
                order: 1,
                styles: {
                    backgroundImage: `url('https://storage.googleapis.com/aries-website/hero-images/Floor%20Liner%20-%20Grey%20(1).jpg')`,
                },
            }, {
                image: 'https://storage.googleapis.com/aries-website/hero-images/navyjeep.jpg',
                text: 'Decked Out Jeep to Be Donated to Navy SEAL Foundation',
                button_text: 'READ MORE',
                link: '/news/48',
                order: 4,
                styles: {
                    backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/navyjeep.jpg)',
                },
            },
        ];
        try {
            const featResponse = await fetch(`http://api.curtmfg.com/v3/part/featured?brandID=3&key=9300f7bc-2ca6-11e4-8758-42010af0fd79`);
            const testResponse = await fetch(`http://api.curtmfg.com/v3/testimonials?key=883d4046-8b96-11e4-9475-42010af00d4e&count=2&randomize=true&brandID=3`);

            state.context.featuredProducts = await featResponse.json();
            state.context.testimonials = await testResponse.json();
        } catch (e) {
            state.context.error = e;
        }

        return <Home context={state.context} />;
    });

    on('error', (state, error) => state.statusCode === 404 ?
        <App context={state.context} error={error}><NotFoundPage /></App> :
        <App context={state.context} error={error}><ErrorPage /></App>
    );
});

export default router;
