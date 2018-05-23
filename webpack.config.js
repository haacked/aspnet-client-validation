const path = require('path');

let tsconfigOverride = {
    declaration: true,
    declarationDir: 'types',
    sourceMap: false,
    noEmit: false
};

module.exports = {
    entry: "./src/index.ts",
    mode: "development",
    output: {
        filename: 'aspnet-validation.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'aspnetValidation',
        libraryTarget: 'umd'
    },
    devtool: false,
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: tsconfigOverride
                }
            },
        ]
    },
};
