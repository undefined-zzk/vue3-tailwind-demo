export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      // 自动添加前缀
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8",
      ],
      grid: true,
    },
  },
};
