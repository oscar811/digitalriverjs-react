import {defineConfig} from 'cypress';

export default defineConfig({
    defaultCommandTimeout: 10000,
    responseTimeout: 60000,
    chromeWebSecurity: false,
    reporter: 'mochawesome',
    reporterOptions: {
        charts: true,
        overwrite: true,
        html: false,
        json: true,
        embeddedScreenshots: true,
        useInlineDiffs: true,
        reportFilename: "[name].html",
        reportDir: "cypress/report/mochawesome"
    },
    env: {
        codeCoverage: {
            exclude: "cypress/**/*.*",
            url: "http://localhost:5173/__coverage__"
        },
        apiUrl: "http://localhost:5173"
    },
    retries: {
        runMode: 2,
        openMode: 1,
    },
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
            viteConfig: {
                //...viteConfig,
            },
        },

        setupNodeEvents(on, config) {
            require("@cypress/code-coverage/task")(on, config);
            return config;
        },
    },

    e2e: {
        baseUrl: 'http://localhost:5173',
        setupNodeEvents(on, config) {
            // implement node event listeners here
            // on(
            //     'file:preprocessor',
            //     vitePreprocessor({
            //       configFile: resolve(__dirname, './configuration/vite.config.mts')
            //       //mode: 'development',
            //     }),
            // )
            return config;
        },
    },
});
