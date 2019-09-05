/**
 * tray 显示托盘
 * */
let {app, Menu, Tray, dialog, ipcMain} = require('electron')
let {autoUpdater} = require('electron-updater')
const path = require('path');

/**
 * 显示托盘
 */
const showTray = () => {
	//非windows系统不显示托盘
	let os = process.platform;
	if (os.indexOf("win32") == -1) return;
	
	let showWindow = () => ipcMain.emit("showWindows");
	let exit = () => app.quit();
	
	let isDev = process.env.NODE_ENV && process.env.NODE_ENV == 'development'
	let trayIcon = isDev ? './public/img/amex.ico' : path.resolve("./") + "/resources/app.asar/dist/img/amex.ico"
	
	let tray = new Tray(trayIcon)
	const contextMenu = Menu.buildFromTemplate([
		{label: '打开主界面2', type: 'normal', checked: true, click: showWindow},
		{label: '检查更新', type: 'normal', checked: true, click: checkForUpdates},
		{label: '退出', type: 'normal', checked: true, click: exit},
	])
	tray.setToolTip('单击打开主界面,或者右击选择退出')
	tray.setContextMenu(contextMenu)
	tray.on("click", function (event, bounds) {
		showWindow()
	})
}

const checkForUpdates = () => {
	autoUpdater.once('update-not-available', res => {
		dialog.showMessageBox({
			type: 'info',
			title: '检查更新提示',
			defaultId: 0,
			noLink: true,
			message: `没有检测到新版本!`,
			buttons: ['我知道了']
		}, (index) => {
		})
	})
	autoUpdater.checkForUpdates()
}

module.exports = {
	showTray: showTray,
	checkForUpdates: checkForUpdates,
}
