/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    const { isServer } = options;
    // if (isServer) {
    //   require('./utils/generate-sitemap.mjs');
    // }

    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/writing',
        permanent: true,
      },
      {
        source: '/talks',
        destination: '/speaking',
        permanent: true,
      },
    ];
  },
};
