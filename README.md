# Out of the box electron-vue (开箱即用项目)

功能说明
1. The front end is developed using vue.js;
    + 前端使用vue.js开发
2. Packaging integration framework using electron
    + 包装集成框架使用electron
3. Support packaged as windows exe installation file, support mac packaged as dmg installation file
    + 支持打包为 windows exe 安装文件, 支持 mac 打包为 dmg 安装文件
4. Support automatic update, use electron-updater dependency, auto update is not supported on mac, need to click the link to manually download and install when prompted to have new version
    + 支持自动更新,使用electron-updater依赖, mac上不支持自动更新,需要在提示有新版时点击链接手动下载安装
5. Display tray function (windows)
    + 显示托盘功能(windows)

## Sqlite3 version, need to compile the node file executed by sqlite3. (sqlite3 版本, 需要编译sqlite3执行的node文件)
1. Switch branches to: sqlite3
    + 切换分支到: sqlite3
1. Need to install python 2.7 and add to path
    + 需要安装python2.7,并加入到path
2. Need to install vs2015, Can be a community version
    + 需要安装vs2015,可以是社区版
3. After executing npm install, you need to execute: npm run rebuild
    + 执行完npm install 后还需要执行: npm run rebuild
4. The syntactic code for sqlite3 is the two files: electron-main/sqlite/sqlite.js, electron-main/sqlite/sqlite_util.js
    + sqlite3 的相文代码是这两个文件
5. The generated db2.db database file is in the project installation directory
    + 生成的 db2.db 数据库文件在项目安装目录

## Project use precautions (项目使用注意事项)
1. Use the latest version of electron, use the latest version of vue
    + 使用最新版本的electron，使用最新版本的vue
2. Out of the box, as the name suggests: Download it and use it directly
    + 开箱即用，顾名思义：下载并直接使用
3. If you have any questions, please go to github to ask issues: https://github.com/guoyucode/electron-vue-guoyu/issues
    + 如果您有任何疑问，请访问 github 提问

## Project setup (项目安装)
```
npm install
```

1. Vue supports compilation and hot update for development
    + vue支持编译和热更新以进行开发
2. Run the first one first, then execute the second one after success. 
    + 先运行第一条,成功后再执行第二条 (这两条命令也就是先编译vue,再开启electron访问vue编译后的代码)
```
npm run dev-vue
npm run dev-electron
```

### Compiles and minifies for production(编译生产版本)
```
npm run build-electron
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
