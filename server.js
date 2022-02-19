const App = require('./app');

if (require.main === module) {
    const app = new App(process.env.PORT || 5555);
    app.start();
}