module.exports = function(grunt) {
    require('jit-grunt')(grunt);
    grunt.loadNpmTasks('grunt-postcss');
    grunt.initConfig({
        less: {
          development: {
            options: {
              compress: true,
              yuicompress: true,
              optimization: 2
            },
            files: {
              "static/css/styles.css": "static/less/_base.less" // destination file and source file
            }
          }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: 'static/css/styles.css'
            }
        },
        watch: {
          styles: {
            files: ['static/less/*.less'], // which files to watch
            tasks: ['less', 'postcss:dist'],
            options: {
              nospawn: true
            }
          }
        }
    });

    grunt.registerTask('default', ['less', 'postcss:dist', 'watch']);
};
