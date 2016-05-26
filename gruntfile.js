var REACT_FOLDER = 'react/',
    REACT_DOM = 'react-dom.min.js',
    REACT = 'react.min.js',
    CLIENT_RELEASE_FOLDER = 'dist-client/',
    CLIENT_SRC_FOLDER = 'src-client/',
    CLIENT_BUNDLE = 'bundle.js'
    CLIENT_ENTRY_POINT = CLIENT_SRC_FOLDER + 'index.tsx',
    CLIENT_MAIN_PAGE = 'index.html',
    SERVER_RELEASE_FOLDER = 'dist-server/',
    SERVER_SRC_FOLDER = 'src-server/',
    SERVER_BUNDLE = 'server.js',
    SERVER_ENTRY_POINT = SERVER_SRC_FOLDER + 'server.tsx',
    TEMP_RELEASE_FOLDER = 'dist/';

module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            client: {
                files: [
                    {expand: true, cwd: CLIENT_SRC_FOLDER, src: [CLIENT_MAIN_PAGE], dest: CLIENT_RELEASE_FOLDER},
                    {expand: true, cwd: 'node_modules/react-dom/dist', src: [REACT_DOM], dest: CLIENT_RELEASE_FOLDER + REACT_FOLDER},
                    {expand: true, cwd: 'node_modules/react/dist', src: [REACT], dest: CLIENT_RELEASE_FOLDER + REACT_FOLDER}
                ]
            },
            server: {
                files: [
                    {expand: true, cwd: TEMP_RELEASE_FOLDER + SERVER_SRC_FOLDER, src: ['**/*.js'], dest: SERVER_RELEASE_FOLDER}
                ]
            }
        },
        webpack: {
            client: {
                entry: './' + CLIENT_ENTRY_POINT,
                output: {
                    filename: './' + CLIENT_RELEASE_FOLDER + CLIENT_BUNDLE,
                },

                // Enable sourcemaps for debugging webpack's output.
                devtool: 'source-map',
                failOnError: true,

                resolve: {
                    // Add '.ts' and '.tsx' as resolvable extensions.
                    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.less']
                },

                module: {
                    loaders: [
                        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                        { test: /\.tsx?$/, loader: 'ts-loader' },
                        { test: /\.css$/, loader: 'style-loader!css' },
                        { test: /\.less$/, loader: 'style-loader!css!less' },
                    ],

                    preLoaders: [
                        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                        { test: /\.js$/, loader: 'source-map-loader' }
                    ]
                },

                plugins: [
                    require('webpack-fail-plugin')
                ],

                // When importing a module whose path matches one of the following, just
                // assume a corresponding global variable exists and use that instead.
                // This is important because it allows us to avoid bundling all of our
                // dependencies, which allows browsers to cache those libraries between builds.
                externals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        },

        'string-replace': {
            client: {
                files: [{
                    expand: true,
                    cwd: CLIENT_RELEASE_FOLDER,
                    src: CLIENT_MAIN_PAGE,
                    dest: CLIENT_RELEASE_FOLDER
                }],
                options: {
                    replacements: [
                        {
                            pattern: '${bundle}',
                            replacement: CLIENT_BUNDLE
                        },
                        {
                            pattern: '${react}',
                            replacement: REACT_FOLDER + REACT
                        },
                        {
                            pattern: '${react-dom}',
                            replacement: REACT_FOLDER + REACT_DOM
                        }
                    ]
                }
            }
        },

        clean: {
            client: [CLIENT_RELEASE_FOLDER + '*'],
            server: [SERVER_RELEASE_FOLDER + '*'],
            temp: [TEMP_RELEASE_FOLDER + '*']
        },
        watch: {
            client: {
                files: [CLIENT_SRC_FOLDER + '**/*.tsx', CLIENT_SRC_FOLDER + '**/*.ts', CLIENT_SRC_FOLDER + '**/*.js', CLIENT_SRC_FOLDER + '**/*.less', CLIENT_SRC_FOLDER + '**/*.css', CLIENT_SRC_FOLDER + '**/*.html'],
                tasks: ['pack-client']
            },
            server: {
                files: [SERVER_SRC_FOLDER + '**/*.ts'],
                tasks: ['pack:server']
            }
        },

        run: {
            'tsc-server': {
                exec: 'node_modules\\.bin\\tsc --outDir ' + TEMP_RELEASE_FOLDER
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-run');

    grunt.registerTask('pack:client', ['copy:client', 'string-replace:client', 'webpack:client']);
    grunt.registerTask('pack:server', ['run:tsc-server', 'copy:server']);
    grunt.registerTask('clean:all', ['clean:client', 'clean:server', 'clean:temp']);
    grunt.registerTask('default', ['clean:all', 'pack:client', 'pack:server']);

};
