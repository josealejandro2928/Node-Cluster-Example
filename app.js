/////////////// Dependencies //////////////////////////
const express = require('express')
const router = express.Router()
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')

module.exports = class App {

    constructor(port = 3000) {
        this.port = port;
        this.app = express();
        this._initGeneralMidd();
        this._initRoutes();
    }

    _initGeneralMidd() {
        this.app.use(cors())
        this.app.use(helmet());
        this.app.use(express.static(path.join(__dirname, './public')));
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        this.app.use(morgan('dev'))
    }

    _initRoutes() {
        const { search } = require('./functions')

        router.get('/', (req, res) => {
            res.send('Hello from this custom simple app')
        })

        router.get('/search', search)

        this.app.use(router);
    }

    start() {

        this.app.listen(this.port, () => {
            console.log(`Worker ${process.pid} listening on port ${this.port}`);
        })

    }

}