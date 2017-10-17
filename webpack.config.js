let tsconfigOverride = {
    declaration: true,
    declarationDir: '@types',
    sourceMap: false,
    noEmit: false
};

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: './dist/aspnet-validation.js',
        library: 'aspnetValidation',
        libraryTarget: 'umd'
    },
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
