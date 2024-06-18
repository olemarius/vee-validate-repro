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
        },
        plugins: [
            vue(),
        ],
    };
});
