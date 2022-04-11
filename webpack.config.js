const { resolve } = require('path');

module.exports = {
    entry: './src/application.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    output: {
        filename: "bundle.js",
        path: resolve(__dirname, 'dist'),
        library: "bindy"
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}
