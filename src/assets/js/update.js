const packageInfo = require('../../../package.json');

/**
 * 升级方法
 * @param _this
 */
export const update = function(_this){
    
    _this.$electron.ipcRenderer.on("update-message", function(e, msg)  {
        console.log("更新消息", e, msg);
        _this.tips = msg;
        //alert(text)
    });

    _this.$electron.ipcRenderer.on("downloadProgress", function(e, msg)  {
        console.log("更新消息-下载进度", e, msg);
        //alert("下载进度: "+ progressObj.percent / 100);
        //_this.downloadPercent = progressObj.percent || 0;
    });

    _this.$electron.ipcRenderer.on("update-message_error", function(e, msg) {
        console.log("更新消息-发生错误", e, msg);
        let html = `<p>检查新版本出错, 是否重新检测?</p>`
        + `<p style="max-height: 150px; overflow-y: auto; overflow-x: hidden; color: #6d6d6d;">错误信息: ${msg}</p>`;
        _this.$confirm(html, '升级提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true,
            type: 'error',
            closeOnClickModal: false,
            dangerouslyUseHTMLString: true,
        }).then(function () {
            _this.$electron.ipcRenderer.send("checkForUpdate")
        });
    });

    _this.$electron.ipcRenderer.on("isUpdateNow", function(e, msg) {
        console.log("更新消息-下载到新版本", e, msg);

        _this.$alert('已经成功为您下载新版本,将在您重启应用后自动安装!', '升级成功提示', {
            confirmButtonText: '我知道了',
        });

        /*_this.$confirm(`已经为您成功下载到新版本,是否现在开始安装,或者在您重启应用后,应用自动安装?`, '升级提示', {
            confirmButtonText: '现在安装',
            cancelButtonText: '我知道了',
            center: true,
            type: 'success'
        }).then(function () {
            _this.$electron.ipcRenderer.send("isUpdateNow");
        });*/
    });

    _this.$electron.ipcRenderer.on("update-message_update-available", function(e, msg) {
        console.log("更新消息-检测到新版本", e, msg);

        //非windows版本自已去手动下载
        let os = process.platform;
        if(os.indexOf("win32") == -1){

            let publish = packageInfo.build.publish[0];
            let fullPath = `${publish.url}/${publish.owner}/${publish.repo}/releases/download/v${msg.version}/${msg.path}`

            //let fullPath = msg["full-path"];
            let html = `检测到新版本: ${msg.version}`
            if(!fullPath) {
                html += " 但更新链接不完整,请联系开发者进行维护"
                _this.$alert(html, '升级提示', {
                    dangerouslyUseHTMLString: true
                });
                return;
            }
            html += `<br/>请点击或者复制下列链接去下载并安装程序 <a href="${fullPath}">${fullPath}</a>`
            _this.$alert(html, '升级提示', {
                dangerouslyUseHTMLString: true
            });
            return
        }

        _this.$confirm(`检测到新版本: ${msg.version} 是否现在开始下载?`, '升级提示', {
            closeOnClickModal: false,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true,
            type: 'warning'
        }).then(function () {
            _this.$electron.ipcRenderer.send("downloadUpdate");
        });
    });

    checkForUpdate(_this)
}

let isDev = process.env.NODE_ENV === 'development'
let checkForUpdate = function (_this) {
    if(isDev) {
        console.warn("开发环境不检测更新")
        return;
    }
    function check() {
        _this.$electron.ipcRenderer.send("checkForUpdate");
    }
    setTimeout(check, 60*1000)
    //setInterval(check, 1000*60*60*6)
}
