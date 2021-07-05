// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

module.exports = {
    mount: {
        "src": "/src",
        "public": "/"
    },
    plugins: [
        '@snowpack/plugin-typescript',
        '@snowpack/plugin-sass',
        'snowpack-plugin-elm',
    ],
    packageOptions: {
        polyfillNode: true,
        source: 'remote',
        types: true
    },
    devOptions: {},
    buildOptions: {
        htmlFragments: true
    },
    alias: {
        "src": "./src",
        "public": "./public",
    }
};
