import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import path from 'path'


const baseUrl: any = {
    development: './',
    beta: './',
    release: './'
}

// https://vitejs.dev/config/
export default ({mode}: any) => defineConfig({
    plugins: [
        vue()
    ],
    css: {
        // css预处理器
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/scss/variable.scss";',
            },
        },
    },
    base: baseUrl[mode],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://backend-api-02.newbee.ltd/manage-api/v1',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }
})
