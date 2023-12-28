// @ts-ignore
// @ts-ignore
import type {ConfigEnv, UserConfig} from "vite";
// @ts-ignore
import {defineConfig} from "vite";
// @ts-ignore
//import vike from "vike/plugin";
import react from "@vitejs/plugin-react";
import {pluginAPIRoutes} from "vite-plugin-api-routes";

export default defineConfig(({}: ConfigEnv): UserConfig => {
    return {
        plugins: [
            //basicSsl(),
            react({include: /\.(mdx|js|jsx|ts|tsx)$/}),
            pluginAPIRoutes({
                //moduleId: "@api",
                cacheDir: "demo/.cache/",
                dirs: [{dir: 'demo/api', route: '', exclude: []}]
            })
        ],
    };
});