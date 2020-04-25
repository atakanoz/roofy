module.exports = function(grunt) {
const sass = require('node-sass');
require('load-grunt-tasks')(grunt);

// Project configuration.
// ------------------------------------------
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // ------------------------------------------
    concat: {
      options: {
        separator: ';',
      },
      scripts: {
        src:  'src/assets/js/*.js', // Compiles every JS files.
        dest: 'dist/assets/js/app.js', // Change the output name as you wish.
      },
    },
    // ------------------------------------------
    uglify: {
      my_target: {
        files: {
          'dist/assets/js/app.min.js': ['dist/assets/js/app.js'], // Minifies the compiled JS file.
        }
      }
    },
    // ------------------------------------------
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'dist',
          hostname: '0.0.0.0',
          protocol: 'http',
          livereload: true,
          open: true,
        }
      }
    },
    // ------------------------------------------
    sass: {
      options: {
        implementation: sass,
        sourceMap: false,
      },
      dist: {
        files: {
            'dist/assets/css/main.css': 'src/assets/style/main.scss', // Compiles SCSS.
        }
      }
    },
    // ------------------------------------------
    autoprefixer:{
      options: {
        browsers: ['last 10 versions', 'ie 11', 'ie 10']
      },
      dist:{
        files:{
          'dist/assets/css/main.css':'dist/assets/css/main.css',
        }
      }
    },
    // ------------------------------------------
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/assets/css/main.min.css': ['dist/assets/css/main.css'], // Minifies the compiled CSS.
        }
      }
    },
    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['src/index.html']
        }
      }
    },
    // ------------------------------------------
    imagemin: {
      dynamic: {
          options: {
            optimizationLevel: 7, // Specify optimization level.
          },
          files: [{
              expand: true,
              cwd: 'src/assets/images',
              src: ['*.{png,jpg,gif}'],
              dest: 'dist/assets/images'
          }]
      }
    },
    // ------------------------------------------
    webfont: {
      icons: {
          src: 'src/assets/glyphs/**/*.svg',
          dest: 'dist/assets/fonts/font-icons/',
          destCss: 'src/assets/style/',
          options: {
            font: 'roofy-icons',
            fontFilename: 'roofy',
            types: 'eot,woff2,woff,ttf,svg',
            order: 'woff2,woff,eot,ttf,svg', // Optimized for compression and speed rates.
            relativeFontPath: '../dist/assets/fonts/font-icons/',
            stylesheet: 'scss',
            htmlDemo: false,
          },
      }
    },
    // ------------------------------------------
    watch: {
      options: {
        livereload: true,
      },
      mainStyle: {
        files: ['src/assets/style/**/.sass', 'src/assets/style/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'cssmin'],
      },
      mainHTML: {
        files: ['src/**/*.html'],
        tasks: ['processhtml'],
      },
      mainFont: {
        files: ['src/assets/glyphs/**/*.svg', 'src/assets/style/scss/global/_fonts.scss'],
        tasks: ['webfont'],
      },
      mainJS: {
        files: ['src/assets/js/**/*.js'],
        tasks: ['concurrent:targetScripts'],
      },
      mainImages: {
        files: ['src/assets/images/**/*.jpg', 'src/assets/images/*.png'],
        tasks: ['imagemin'],
      },
    },

    // ------------------------------------------
    concurrent: {
        targetStyles: ['sass', 'autoprefixer', 'cssmin'],
        targetScripts: ['concat', 'uglify'],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-processhtml');


  // Default task(s).\
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('roofy', ['connect','watch']);


};
