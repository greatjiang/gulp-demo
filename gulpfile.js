const gulp = require('gulp')
const minimist = require('minimist')
const rename = require('gulp-rename')
const connect = require('gulp-connect')
const livereload = require('gulp-livereload')
const replace = require('gulp-replace')
const rev = require('gulp-rev')
const less = require('gulp-less')
const prefix = require('less-plugin-autoprefix')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const pump = require('pump')
const babel = require('gulp-babel')

const prefixConfing = new prefix({
  browsers:['last 4 versions']
})

gulp.task('create',() => {
  let options = minimist(process.argv.slice(2))
  let uriArr = options.name.split('/')
  let projectPath = options.name
  let filename = uriArr[uriArr.length-1]
  let template = options.template

  gulp.src('src/template/'+template+'/'+template+'.html')
    .pipe(replace('default',filename))
    .pipe(rename(filename + '.html'))
    .pipe(gulp.dest('src/dev/'+projectPath))

  gulp.src('src/template/'+template+'/'+template+'.css')
    .pipe(rename(filename+'.css'))
    .pipe(gulp.dest('src/dev/'+projectPath))

  gulp.src('src/template/'+template+'/'+template+'.js')
    .pipe(rename(filename+'.js'))
    .pipe(gulp.dest('src/dev/'+projectPath))

  gulp.src('src/template/'+template+'/'+template+'.less')
    .pipe(rename(filename+'.less'))
    .pipe(gulp.dest('src/dev/'+projectPath))

  console.log(projectPath,filename)
})

gulp.task('webserver_src',() => {
  connect.server({
    root:'./',
    port:8888,
    liverreload: true
  })
})

gulp.task('watch',()=>{
  let options = minimist(process.argv.slice(2))
  let uriArr = options.name.split('/')
  let projectPath = options.name
  let filename = uriArr[uriArr.length-1]
  let template = options.template

  livereload.listen()

  gulp.watch('src/dev/**/**/*.*',event =>{
    console.log(event.path)
    gulp.src(event.path)
      .pipe(gulp.dest('src/dev/'+projectPath))
      .pipe(livereload())
  })
})

gulp.task('less',()=>{
  let options = minimist(process.argv.slice(2))
  let uriArr = options.name.split('/')
  let projectPath = options.name
  let filename = uriArr[uriArr.length-1]
  let template = options.template

  gulp.watch('src/dev/'+projectPath+'/*.less',event =>{
    console.log(event.path)
    gulp.src('src/dev/'+projectPath+'/*.less')
      .pipe(less({
        plugins:[prefixConfing]
      }))
      .pipe(gulp.dest('src/dev/'+projectPath))
      .pipe(livereload())
  })
})

gulp.task('js',()=>{
  let options = minimist(process.argv.slice(2))
  let uriArr = options.name.split('/')
  let projectPath = options.name
  let filename = uriArr[uriArr.length-1]
  let template = options.template

  gulp.watch('src/dev/'+projectPath+'/*.js',event =>{
    console.log(event.path)
    gulp.src('src/dev/'+projectPath+'/*.js')
      .pipe(gulp.dest('src/dev/'+projectPath))
      .pipe(livereload())
  })
})

gulp.task('build',cb =>{
  let options = minimist(process.argv.slice(2))
  let uriArr = options.name.split('/')
  let projectPath = options.name
  let filename = uriArr[uriArr.length-1]
  let template = options.template

  gulp.src('src/dev/'+projectPath+'/*.js')
    .pipe(babel({
      presets:['env']
    }))
    // .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('src/build/'+projectPath))

  gulp.src('src/dev/'+projectPath+'/*.css')
    .pipe(rename({suffix:'.min'}))
    .pipe(cleanCSS({
      compatibility:'ie8'
    }))
    .pipe(gulp.dest('src/build/'+projectPath))

  gulp.src('src/dev/'+projectPath+'/*.html')
    .pipe(replace(filename,filename+'.min'))
    .pipe(gulp.dest('src/build/'+projectPath))
})

gulp.task('default', ['webserver_src','watch','less','js'])
