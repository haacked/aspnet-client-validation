module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: './src/index.js',
        library: 'aspnetValidation',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        ]
    },
};
