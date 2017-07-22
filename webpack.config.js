module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: './src/index.js',
        library: 'aspnetValidation',
        libraryTarget: 'umd'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
};
