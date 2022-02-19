module.exports = {
    search: (req, res) => {
        const start = performance.now();
        let iter = +req.query["iter"] || 1e6;

        let value = 0;
        for (let i = 1; i <= iter; i++) {
            value += Math.log(i);
        }

        const duration = performance.now() - start;

        return res.status(200).json({
            result: value,
            timing: `${duration} ms`,
            iter: iter
        })
    }

}