/* node: true */

'use strict';

module.exports = function (grunt) {
  var bs = require('browser-sync');

  require('time-grunt')(grunt);

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    usebanner: 'grunt-banner'
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bwr: grunt.file.readJSON('bower.json'),
    project: {
      src: 'src',
      dist: 'dist',
      index: '<%= project.dist %>/index.html',
      assets: '<%= project.dist %>/assets',
      components: grunt.file.readJSON('.bowerrc').directory,
      banner: '/*!\n' +
      ' * <%= pkg.title %> v<%= pkg.version %> (<%= grunt.template.today("dd.mm.yyyy") %>)\n' +
      ' * Copyright by <%= pkg.author %>\n' +
      ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
      ' */\n'
    },

    clean: {
      options: {
        force: true
      },
      dist: {
        dot: true,
        src: ['<%= project.dist %>/*', '!<%= project.dist %>/.git*']
      }
    },

    sass: {
      dist: {
        options: {
          noLineComments: false,
          relativeAssets: true,
          sourceMap: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= project.src %>/styles',
            dest: '<%= project.assets %>/styles',
            src: '**/*.{scss,sass}',
            ext: '.css'
          }
        ]
      }
    },

    wiredep: {
      html: {
        src: '<%= project.index %>',
        exclude: ['<%= project.components %>/bootstrap-sass-official/assets/javascripts/bootstrap.js', '<%= project.components %>/modernizr/modernizr.js']
      },
      scss: {
        src: '<%= project.src %>/styles/**/*.{scss,sass}'
      }
    },

    modernizr: {
      dist: {
        options: {
          preserveComments: false
        },
        uglify: true,
        devFile: '<%= project.components %>/modernizr/modernizr.js',
        outputFile: '<%= project.assets %>/scripts/modernizr.custom.min.js',
        extra: {
          shiv: true,
          printshiv: true,
          load: true,
          mq: false,
          cssclasses: true
        },
        extensibility: {
          addtest: false,
          prefixed: true,
          teststyles: false,
          testprops: false,
          testallprops: false,
          hasevents: false,
          prefixes: true,
          domprefixes: true
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '<%= project.src %>/scripts/.jshintrc'
      },
      dist: ['Gruntfile.js', '<%= project.src %>/scripts/**/*.js', '!<%= project.src %>/scripts/vendor/**/*.js']
    },

    jscs: {
      options: {
        config: '<%= project.src %>/scripts/.jscsrc'
      },
      dist: {
        src: ['Gruntfile.js', '<%= project.src %>/scripts/**/*.js', '!<%= project.src %>/scripts/vendor/**/*.js']
      }
    },

    ngAnnotate: {
      dist: {
        options: {
          sourceMap: true,
          singleQuotes: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= project.src %>/scripts',
            src: ['*.js', '!*.min.js'],
            dest: '<%= project.assets %>/scripts'
          }
        ]
      }
    },

    uglify: {
      dist: {
        options: {
          sourceMap: false,
          preserveComments: false
        },
        files: [
          {
            expand: true,
            cwd: '<%= project.assets %>/scripts',
            src: ['*.js', '!*.min.js'],
            dest: '<%= project.assets %>/scripts',
            ext: '.min.js'
          }
        ]
      }
    },

    autoprefixer: {
      options: {
        browsers: ['Android 2.3', 'Android >= 4', 'Chrome >= 20', 'Firefox >= 24', 'Explorer >= 8', 'iOS >= 6', 'Opera >= 12', 'Safari >= 6']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= project.assets %>/styles',
            src: ['*.css', '!*.min.css'],
            dest: '<%= project.assets %>/styles'
          }
        ]
      }
    },

    cssmin: {
      dist: {
        options: {
          compatibility: 'ie8',
          keepSpecialComments: '*',
          advanced: false
        },
        files: [
          {
            expand: true,
            cwd: '<%= project.assets %>/styles',
            src: ['*.css', '!*.min.css'],
            dest: '<%= project.assets %>/styles',
            ext: '.min.css'
          }
        ]
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= project.banner %>'
      },
      css: {
        files: {
          src: ['<%= project.assets %>/styles/main.css', '<%= project.assets %>/styles/main.min.css']
        }
      },
      js: {
        files: {
          src: ['<%= project.assets %>/scripts/main.js', '<%= project.assets %>/scripts/main.min.js']
        }
      }
    },

    csscomb: {
      options: {
        config: '<%= project.src %>/styles/.csscomb.json'
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= project.assets %>/styles',
            src: ['*.css', '!*.min.css'],
            dest: '<%= project.assets %>/styles'
          }
        ]
      }
    },

    copy: {
      fonts: {
        expand: true,
        cwd: '<%= project.src %>/fonts',
        src: '*',
        dest: '<%= project.assets %>/fonts'
      },
      vendor: {
        expand: true,
        cwd: '<%= project.src %>/scripts/vendor',
        src: '*',
        dest: '<%= project.assets %>/scripts/vendor'
      },
      svg: {
        expand: true,
        cwd: '<%= project.src %>/images',
        src: ['**/*.svg'],
        dest: '<%= project.assets %>/images'
      },
      glyphicons: {
        expand: true,
        cwd: '<%= project.vendor %>/bootstrap-sass-official/assets/fonts/bootstrap/*',
        src: '*',
        dest: '<%= project.assets %>/fonts'
      }
    },

    jade: {
      options: {
        pretty: true
      },
      dist: {
        expand: true,
        cwd: '<%= project.src %>/templates',
        src: ['**/*.jade', '!**/_*.jade'],
        dest: '<%= project.dist %>',
        ext: '.html'
      }
    },

    useminPrepare: {
      options: {
        dest: '<%= project.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      },
      html: '<%= project.index %>'
    },

    usemin: {
      options: {
        assetsDirs: ['<%= project.components %>']
      },
      html: '<%= project.index %>',
      css: ['<%= project.assets %>/styles/**/*.css']
    },

    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= project.src %>/images',
            src: ['**/*.{png,gif,jpg,jpeg,svg}'],
            dest: '<%= project.assets %>/images'
          }
        ]
      }
    },

    uncss: {
      dist: {
        options: {
          stylesheets: ['../<%= project.assets %>/styles/main.css']
        },
        files: {
          '<%= project.assets %>/styles/main.css': ['<%= project.dist %>/**/*.html']
        }
      }
    },

    watch: {
      options: {
        spawn: false
      },
      scripts: {
        files: '<%= project.src %>/scripts/**/*.js',
        tasks: ['ngAnnotate', 'uglify:dist', 'usebanner:js', 'bs-inject']
      },
      styles: {
        files: '<%= project.src %>/styles/**/*.{scss,sass}',
        tasks: ['newer:imagemin', 'newer:copy', 'sass', 'uncss', 'csscomb', 'autoprefixer', 'cssmin:dist', 'usebanner:css', 'bs-inject']
      },
      templates: {
        files: '<%= project.src %>/templates/**/*.jade',
        tasks: ['newer:imagemin', 'newer:copy', 'jade', 'wiredep', 'useminPrepare', 'usemin', 'ngAnnotate', 'uglify:dist', 'csscomb', 'cssmin:dist', 'usebanner:css', 'bs-inject']
      },
      images: {
        files: '<%= project.src %>/images',
        tasks: ['newer:imagemin', 'newer:copy', 'bs-inject']
      }
    }
  });

  grunt.registerTask('bs-init', 'Start BrowserSync Server', function () {
    var done = this.async();

    bs({
      server: 'dist',
      notify: false,
      ghostMode: false
    }, function () {
      done();
    });
  });

  grunt.registerTask('bs-inject', 'Reload Files in Browser', function () {
    return bs.reload();
  });

  grunt.registerTask('default', ['lint', 'build', 'serve']);

  grunt.registerTask('lint', ['jshint', 'jscs']);

  grunt.registerTask('serve', ['bs-init', 'watch']);

  grunt.registerTask('build', ['clean', 'imagemin', 'copy', 'jade', 'wiredep', 'useminPrepare', 'sass', 'uncss', 'modernizr', 'autoprefixer', 'cssmin:generated', 'ngAnnotate', 'concat:generated', 'uglify:generated', 'usemin', 'uglify:dist', 'csscomb', 'cssmin:dist', 'usebanner']);
};
