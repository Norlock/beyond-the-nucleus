// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        "src": "/src",
        "public": "/"
    },
    plugins: [
        '@snowpack/plugin-typescript',
        '@snowpack/plugin-sass'
    ],
    packageOptions: {
        polyfillNode: true
    },
    devOptions: {
        hmrDelay: 50
    },
    buildOptions: {
    },
    alias: {
        "src": "./src",
        "public": "./public",
    }
};
