var path = require('path');
module.exports = {
    entry: {
        "build/main": "./build/main.js",
    },
    output: {
        filename: '[name].dist.js'
    },
    resolve: {
        root: [path.join(__dirname, 'node_modules')],
        extensions: ['', '.ts', '.webpack.js', '.web.js', '.js', '.tsx', ".jsx"]
    }
}