# gulp-demo
## 前端工程化敲门砖---gulp入门实战

>在前端工程化普遍的今天，若不掌握一门工程化技巧是一种得不偿失的事情。工程化主要是能节省大量的不必要的工作时间，摆脱石器时代的一种标志。  

>今天的主角就是Gulp。  
>四大特点：易于使用、构建快速、插件高质、易于学习。总结起来就是简单方便

## 简单：
### gulp简单到API只有四个   
>gulp.src  
  “输出符合所提供的匹配模式或者匹配模式数组的文件”。简单说就是你要操作的文件  
>gulp.dest  
  "能被pipe进来，并且将会写文件。并且重新输出所有数据，因此你可以将它pipe到多个文件夹。如果某文件夹不存在，将会自动创建"。经过一些操作(版本号、压缩、合并、预编译等)产出文件到指定位置(目录)，如果没有则会自动创建。  
>gulp.task  
  定义任务  
>gulp.watch  
  监听文件  

## 实战
### 根据指定模板创建项目，项目完成后编译到线上目录。  
>目录结构，在根目录下创建src文件，文件包括template（放置模板）、dev（开发目录）、build(生产目录))  
>编写gulpfile.js   
>模板文件创建完成，就可以开始配置gulpfile.js文件了。     
  创建任务gulp.task('create',()=>{})   
  监听任务gulp.task('watch',()=>{})     
  生产gulp.task('build',()=>{})     
  less任务gulp.task('less',()=>{})     
  js任务gulp.task('js',()=>{})     
>服务器任务gulp.task('webserver_src',()=>{})  
>我们再创建一个默认任务，把服务任务、监听任务、js任务、less任务放进去   
  gulp.task('default', ['webserver_src','watch','less','js'])  
>工作流程  
  通过指令  gulp create --name greatjiang/jiang --template default 创建一个greatjiang/jiang项目 模板为default模板  
  通过指令 gulp watch --name greatjiang/jiang 监听greatjiang/jiang目录。开启监听之后，会把对问价你的修改经过一系列的操作（比如less任务中的添加前缀）产出到指定目录文件 
>通过指令 gulp build --name greatjiang/jiang 把项目产出到生产文件夹  
### 本实战例子只是对gulp工程的简单配置，实现了基本的功能，包括：文件名替换、内容名替换、浏览器样式支持、css压缩，具体代码体现

## 前端早已不是石器时代的开发方式，通过对各种构建工具的掌握能极大的提高我们的生产效率。保持积极的学习态度，才能在千变万化的前端世界中享受快乐。
## 我爱前端，前端使我快乐(此处应有表情包)
