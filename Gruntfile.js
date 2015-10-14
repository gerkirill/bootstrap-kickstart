module.exports = function(grunt) {

  grunt.initConfig({
    less: {
      compileCustomBootstrapCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'bootstrap.css.map',
          sourceMapFilename: 'www/css/bootstrap.css.map'
        },
        src: 'less/custom-bootstrap.less',
        dest: 'www/css/bootstrap.css'
      },
      compileTheme: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'style.css.map',
          sourceMapFilename: 'www/css/style.css.map'
        },
        src: 'less/style.less',
        dest: 'www/css/style.css'
      }
    },
    copy: {
        assets: {
          files: [
            {src: ['node_modules/bootstrap/dist/js/*'], dest: 'www/js/', expand: true, flatten: true, filter: 'isFile'},
            {src: ['node_modules/bootstrap/dist/fonts/*'], dest: 'www/fonts/', expand: true, flatten: true, filter: 'isFile'},
            {src: ['node_modules/jquery/dist/*'], dest: 'www/js', expand: true, flatten: true, filter: 'isFile'}
          ]
        }
    },
    watch: {
        css: {
          files: ['less/theme/*.less', 'less/custom-bootstrap/*.less'],
          tasks: ['less:compileTheme', 'less:compileCustomBootstrapCore']
        }
    },
    shell: {
      httpServer: {
        command: 'node_modules/.bin/http-server www'
      },
      livereload: {
        command: 'node_modules/.bin/livereload www'
      }
    },
    concurrent: {
      develop: {
        tasks: ['shell:httpServer', 'watch:css', 'shell:livereload'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('build', [
    'copy:assets',
    'less:compileCustomBootstrapCore', 'less:compileTheme'
  ]);
  grunt.registerTask('develop', ['build', 'concurrent:develop']);
};
