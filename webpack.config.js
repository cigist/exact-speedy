module.exports = {
    entry:{
        app:"./src/assets/js/app.js"
    },
    output: {
        path: __dirname + "./dist/assets/js/",
        filename: "[name].js"
    },
    module: {
        loaders:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader:['babel-loader'],
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}