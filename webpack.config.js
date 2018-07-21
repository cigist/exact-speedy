var path = require('path');
module.exports = {
    entry:{
        app:"./src/assets/js/app.js"
    },
    output: {
        path:path.resolve(__dirname + "./dist/assets/js/"),
        filename: "[name].js"
    },
    module: {
        module: {
            loaders: [{ 
              test: /\.js$/, 
              exclude: /node_modules/, 
              loader: "babel-loader" 
            }]
        }
    }
}