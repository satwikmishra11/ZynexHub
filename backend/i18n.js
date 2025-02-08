const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-fs-backend');
const path = require('path');

i18next.use(Backend).init({
    fallbackLng: 'en',
    preload: ['en', 'es', 'fr'], // Load supported languages
    backend: {
        loadPath: path.join(__dirname, '/locales/{{lng}}/translation.json'),
    },
    detection: {
        order: ['header', 'querystring', 'cookie'],
        caches: ['cookie'],
    }
});

module.exports = { i18next, i18nextMiddleware };
