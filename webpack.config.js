const path = require('path');

const cssnext = require('postcss-cssnext');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
    // Don't attempt to continue if there are any errors.
    bail: true,
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: 'js/app.js',
        // The build folder
        path: path.join(process.cwd(), 'build'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules'],
    },
    module: {
        loaders: [
            // The "url" loader handles all assets unless explicitly excluded.
            // The `exclude` list *must* be updated with every change to loader extensions.
            // When adding a new loader, you must add its `test`
            // as a new entry in the `exclude` list in the "url" loader.

            // "file" loader makes sure those assets end up in the `build` folder.
            // When you `import` an asset, you get its filename.
            {
                exclude: [
                    /robots\.txt$/,
                    /sitemap\.xml$/,
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.json$/,
                    // /\.bmp$/,
                    // /\.gif$/,
                    // /\.jpe?g$/,
                    // /\.png$/,
                    // /\.svg$/
                ],
                loader: 'file-loader',
                options: {
                    name: 'media/[name].[ext]',
                },
            },
            {
                include: [
                    /index\.html$/,
                    /robots\.txt$/,
                    /sitemap\.xml$/,
                ],
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            // "url" loader works just like "file" loader but it also embeds
            // assets smaller than specified size as data URLs to avoid requests.
            // {
            //     test: /\.(png|jpe?g|woff|woff2|eot|ttf|svg)$/,
            //     loader: 'url-loader',
            //     options: {
            //         limit: 10000,
            //         name: 'media/[name].[ext]',
            //     },
            // },
            // Process JS with Babel.
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules\//,
                loader: 'babel-loader',
                options: {
                    babelrc: true,
                },
            },
            // {
            //     test: /\.json$/,
            //     loader: 'json-loader'
            // },
            // The notation here is somewhat confusing.
            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader normally turns CSS into JS modules injecting <style>,
            // but unlike in development configuration, we do something different.
            // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
            // (second argument), then grabs the result CSS and puts it into a
            // separate file in our build process. This way we actually ship
            // a single CSS file in production instead of JS code injecting <style>
            // tags. If you use code splitting, however, any async bundles will still
            // use the "style" loader inside the async code so CSS from them won't be
            // in the main CSS file.
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    Object.assign(
                        {
                            fallback: 'style-loader',
                            use: [
                                {
                                    loader: require.resolve('css-loader'),
                                    options: {
                                        importLoaders: 1,
                                        minimize: true,
                                        sourceMap: false,
                                    },
                                },
                                {
                                    loader: require.resolve('postcss-loader'),
                                    options: {
                                        ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                                        plugins: () => [
                                            require('postcss-flexbugs-fixes'),
                                            require('postcss-import'),
                                            require('postcss-url'),
                                            cssnext({
                                                browsers: [
                                                    '>1%',
                                                    'last 3 versions',
                                                    'Firefox ESR',
                                                    'not ie < 11',
                                                ],
                                            }),
                                        ],
                                    },
                                },
                            ],
                        },
                        {}
                    )
                ),
            }
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
            sourceMap: true,
        }),
        new ImageminPlugin({
            test: /\.(jpe?g|png)$/,
            jpegtran: {
                progressive: false,
                // arithmetic: true,
            },
            optipng: {
                optimizationLevel: 9
            },
        }),
        // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
        new ExtractTextPlugin({
            filename: 'css/style.css',
        }),
        // Moment.js is an extremely popular library that bundles large locale files
        // by default due to how Webpack interprets its code. This is a practical
        // solution that requires the user to opt into importing specific locales.
        // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
        // You can remove this if you don't use Moment.js:
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
};