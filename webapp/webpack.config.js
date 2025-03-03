const path = require('path');

module.exports = {
    entry: [
        './src/index.js',
    ],
    resolve: {
        modules: [
            'src',
            'node_modules',
        ],
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-react',
                            ['@babel/preset-env', {
                                targets: {
                                    chrome: 66,
                                    firefox: 60,
                                    edge: 42,
                                    safari: 12,
                                },
                                modules: false,
                                corejs: 3,
                                debug: false,
                                useBuiltIns: 'usage',
                                shippedProposals: true,
                            }],
                            ['@babel/typescript', {
                                allExtensions: true,
                                isTSX: true,
                            }],
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-object-rest-spread',
                        ],
                    },
                },
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
        ],
    },
    externals: {
        react: 'React',
        redux: 'Redux',
        'react-redux': 'ReactRedux',
        'prop-types': 'PropTypes',
        'react-bootstrap': 'ReactBootstrap',
        'mattermost-webapp/plugins': 'registerPlugin',
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: 'main.js',
    },
};
