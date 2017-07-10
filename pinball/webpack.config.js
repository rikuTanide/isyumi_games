var path = require('path');
module.exports = {
    entry: {
        "build/src/index": "./build/src/index.js",
        "build/test/view/index": "./build/test/view/index.js"
    },
    output: {
        filename: '[name].dist.js'
    },
    resolve: {
        root: [path.join(__dirname, 'node_modules')],
        extensions: ['', '.ts', '.webpack.js', '.web.js', '.js', '.tsx', ".jsx"]
    }
}