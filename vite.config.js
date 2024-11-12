import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
    }),
  ],
  build: {
    outDir: "./dist",
    minify: false,
    // 进行压缩计算
    brotliSize: false,
    //指定输出路径
    assetsDir: "./",
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        //静态资源分类打包
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        // assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        assetFileNames(assetInfo) {
          // 判断后缀分别放到不用的文件夹中
          if (assetInfo.name.endsWith(".css")) {
            return "static/css/[name]-[hash].[ext]";
          }
          if (
            ["png", "jpg", "svg", "PNG"].some((ext) =>
              assetInfo.name.endsWith(ext)
            )
          ) {
            return "static/img/[name]-[hash].[ext]";
          }
          if (
            ["ttf", "woff", "woff2"].some((ext) => assetInfo.name.endsWith(ext))
          ) {
            return "static/fonts/[name]-[hash].[ext]";
          }
          return "static/css/[name]-[hash].[ext]";
        },
        manualChunks(id) {
          //静态资源分拆打包
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "./",
  productionSourceMap: false,
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          // 自动添加前缀
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
          ],
          grid: true,
        }),
      ],
    },
  },
});
