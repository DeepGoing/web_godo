module.exports = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      // svg 사용시 엑박이 떠서 공식 문서 내용에서 발췌하여 추가했습니다
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: [],
  },
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
    [
      "@fullhuman/postcss-purgecss",
      {
        content: [
          "./pages/**/*.{js,jsx,ts,tsx}",
          "./components/**/*.{js,jsx,ts,tsx}",
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ["html", "body"],
      },
    ],
  ],
  compiler: {
    emotion: true,
  },
  swcMinify: true,
};
