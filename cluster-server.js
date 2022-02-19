const App = require('./app');
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;

if (require.main === module) {
    if (cluster.isMaster) {
        console.log(`Number of CPUs is ${totalCPUs}`);
        console.log(`Master ${process.pid} is running`);

        //////// Create the child process //////////////
        for (let i = 0; i < totalCPUs; i++) {
            cluster.fork();
        }

        cluster.on("exit", (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid}  stops with error: ${code || signal}  `);
            console.log("Let's fork another worker!");
            cluster.fork();
        });

    } else {
        const app = new App(process.env.PORT || 5555);
        app.start();

    }

}