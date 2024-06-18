/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import * as pkg from './package.json';

export const serverPort = 3010;

export default defineConfig(() => {
    return {
        resolve: {
            alias: [
                {
                    find: '@/lib',
                    replacement: resolve(__dirname, '../../packages/ui/src/lib'),
                },
                {
                    find: '@/components/ui',
                    replacement: resolve(__dirname, '../../packages/ui/src/components/ui'),
                },
                {
                    find: '@',
                    replacement: resolve(__dirname, 'src'),
                },
                {
                    find: 'types',
                    replacement: resolve(__dirname, 'types'),
                },
            ],
            /**
             * If you have duplicated copies of the same dependency in your app (likely due to hoisting or linked packages in monorepos),
             * use this option to force Vite to always resolve listed dependencies to the same copy (from project root).
             * https://vitejs.dev/config/shared-options#resolve-dedupe
             */
            dedupe: ['vee-validate'],
        },
        plugins: [
            vue(),
        ],
    };
});
