var REACT_FOLDER = 'react/',
    REACT_DOM = 'react-dom.min.js',
    REACT = 'react.min.js',
    RELEASE_FOLDER = 'dist/',
    SRC_FOLDER = 'src/',
    BUNDLE = 'bundle.js'
    ENTRY_POINT = 'src/index.tsx',
    MAIN_PAGE = 'index.html';


module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {expand: true, cwd: SRC_FOLDER, src: [MAIN_PAGE], dest: RELEASE_FOLDER},
          {expand: true, cwd: 'node_modules/react-dom/dist', src: [REACT_DOM], dest: RELEASE_FOLDER + REACT_FOLDER},
          {expand: true, cwd: 'node_modules/react/dist', src: [REACT], dest: RELEASE_FOLDER + REACT_FOLDER}
        ]
      }
    },
    webpack: {
      main: {
        entry: './' + ENTRY_POINT,
        output: {
            filename: './' + RELEASE_FOLDER + BUNDLE,
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
        },

        module: {
            loaders: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                { test: /\.tsx?$/, loader: "ts-loader" }
            ],

            preLoaders: [
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { test: /\.js$/, loader: "source-map-loader" }
            ]
        },

        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        }

      }
    },

    'string-replace': {
      main: {
          files: [{
            expand: true,
            cwd: RELEASE_FOLDER,
            src: MAIN_PAGE,
            dest: RELEASE_FOLDER
          }],
          options: {
            replacements: [
              {
                pattern: '${bundle}',
                replacement: BUNDLE
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
      release: [RELEASE_FOLDER + '*']
    },
    watch: {
      files: [SRC_FOLDER + '**/*.tsx', SRC_FOLDER + '**/*.html'],
      tasks: ['copy:main', 'string-replace:main', 'webpack:main']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('default', ['clean:release', 'copy:main', 'string-replace:main', 'webpack:main']);
};
