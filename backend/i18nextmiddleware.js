const express = require('express');
const { i18next, i18nextMiddleware } = require('./i18n');
const authRoutes = require('./routes/auth');

const app = express();
app.use(i18nextMiddleware.handle(i18next));
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/api/welcome', (req, res) => {
    res.json({ message: req.t('welcome') });
});

app.listen(5000, () => console.log('Server running on port 5000'));
