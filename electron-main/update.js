/**
 * 更新使用
 */


let { ipcMain } = require('electron')
let { autoUpdater } = require('electron-updater')

const packageInfo = require('../package.json');

// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
module.exports = mainWindow => {

    autoUpdater.autoDownload = false
    // 通过main进程发送事件给renderer进程，提示更新信息
    function sendUpdateMessage(text) {
        mainWindow.webContents.send('update-message', text)
    }

    let message = {
        error: '检查更新出错',
        checking: '正在检查更新……',
        updateAva: '检测到新版本，正在下载……',
        updateNotAva: '现在使用的就是最新版本，不用更新',
    };

    //通用服务器的下载方式
    //const uploadUrl = packageInfo.build.publish[0].url; // 下载地址，不加后面的**.exe

    //github的下载包方式
    let publish = packageInfo.build.publish[0];
    autoUpdater.setFeedURL(publish);

    autoUpdater.on('update-not-available', function (info) {
        sendUpdateMessage(message.updateNotAva)
    });
    autoUpdater.on('checking-for-update', function () {
        sendUpdateMessage(message.checking)
    });


    autoUpdater.on('error', function (e, msg) {
        mainWindow.webContents.send('update-message_error', msg)
    });
    autoUpdater.on('update-available', function (info) {
        mainWindow.webContents.send('update-message_update-available', info)
    });


    // 更新下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
        mainWindow.webContents.send('downloadProgress', progressObj)
        //mainWindow.setProgressBar(progress.percent / 100);
    })

    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        mainWindow.webContents.send('isUpdateNow')
    });

    //下载完成,开始更新
    ipcMain.on('isUpdateNow', () => {
        autoUpdater.quitAndInstall();
    });

    //执行下载更新
    ipcMain.on("downloadUpdate",()=>{
        autoUpdater.downloadUpdate()
    })

    //执行自动更新检查
    ipcMain.on("checkForUpdate",()=>{
        autoUpdater.checkForUpdates();
    })
}

/*{
        "provider": "generic",
        "url": "https://guoyu.link/StockInfoWatch-download/"
      }*/

