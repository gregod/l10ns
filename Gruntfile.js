

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};


module.exports = function(grunt, gt) {

  var gt = gt || false;

  'use strict';

  // Project configuration.
  grunt.initConfig({

    jshint: {
      options: {
        curly    : true,
        eqeqeq   : true,
        loopfunc : true,
        forin    : false,
        immed    : true,
        latedef  : true,
        newcap   : true,
        noarg    : true,
        sub      : true,
        undef    : true,
        boss     : true,
        eqnull   : true,
        node     : true,
        es5      : true,
        supernew : true,
        strict   : false,
        expr     : true,
        globals: {
          gt       : true,
          describe : true,
          it       : true,
          before   : true,
          define   : true
        }
      },

      files: [
        'grunt.js',
        'app/**/*.js',
        'lib/**/*.js',
        '!app/build/tmpl.js',
        '!app/vendor/**',
        'src/**/*.js'
      ]
    },

    compass: {
      dist: {
        options: {
          config         : 'app/config.rb',
          require        : ['susy', 'breakpoint', 'sassy-buttons', 'toolkit'],
          sassDir        : 'app/build',
          cssDir         : 'app/public/styles',
          debugInfo      : true,
          noLineComments : true,
          imagesDir      : 'app/public/images'
        }
      }
    },

    translate: {
      dist: {
        options: {
          config          : './test/translations',
          requireJS       : true,
          defaultLanguage : 'en', // grunt-translate use it to update translation.
          output          : './test/translations/output',
          src             : ['./test/example/**/*.js'],
          interface: {
            autoOpen : true,
            port     : 3000
          }
        }
      }
    },

    // Configuration to be run (and then tested)
    regarde: {
      txt: {
        files: '**/*.txt',
        tasks: ['livereload']
      }
    },

    dot: {
      dist: {
        options: {
          variable: 'tmpl'
        },
        src  : ['app/**/*.dot'],
        dest : 'app/build/tmpl.js'
      }
    },

    open : {
      translation : {
        path: 'http://localhost:3000/translations'
      }
    },

    jsdoc : {
      dist : {
        src: [
          'app/**/*.js',
          '!app/vendor/**',
          'src/**/*.js',
          'tasks/**/*.js'
        ],
        options: {
          destination: 'docs'
        }
      }
    },

    watch: {
      templates: {
        files: [
          '**/*.dot',
          '**/*.part'
        ],
        tasks: ['dot']
      },

      jshint: {
        files: [
          '**/*.js',
          'Gruntfile.js',
          'bin/**/*.js',
          'tasks/**/*.js',
          '!app/build/tmpl.js'
        ],
        tasks: ['jshint', 'translate:update', 'translate:compile']
      },

      compass: {
        files: ['app/**/*.scss'],
        tasks: ['compass']
      }
    }

  });
  // Load local tasks.
  if(gt) {
    grunt.task.loadTasks('tasks/translate.js'); // Some grunt trick
  } else {
    grunt.task.loadTasks('tasks'); // Some grunt trick
  }


  // Load npm tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-dot-compiler');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task.
  grunt.registerTask('default', 'jshint translate:update translate:compile test');

};
