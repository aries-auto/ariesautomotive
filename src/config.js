/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

export const port = process.env.PORT || 8082;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
export const googleAnalyticsId = 'UA-XXXXX-X';
export const googleApiKey = process.env.GOOGLE_API_KEY || 'AIzaSyDn9YGVNo4kN7qqDD8t1qf613K6S0TTxuA';
export const hostAddress = process.env.WEBSITE_ADDRESS || `http://${host}`;
export const iapiBase = process.env.NODE_ENV === 'development' ? 'http://localhost:8084' : 'https://iapi.curtmfg.com';
export const apiBase = process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : 'https://goapi.curtmfg.com';
export const apiKey = process.env.API_KEY !== undefined && process.env.API_KEY !== 'undefined' ? process.env.API_KEY : 'No Api Key';
