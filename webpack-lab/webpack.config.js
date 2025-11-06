const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true,
    },
    mode: "development",
    devServer: {
        static: "./dist",
        port: 4000,
        open: true,
        hot: true,
    },
};
