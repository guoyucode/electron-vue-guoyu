/**
 * 快捷键设置
 * */
let { ipcMain, globalShortcut } = require('electron')

let mainWindow = null;

/**
 * 快捷键
 * @param mainWindow_input
 */
module.exports = mainWindow_input => {
    mainWindow = mainWindow_input
    //设置刷新快捷键
    //监听通知发送过来的消息
    ipcMain.on("setHotKey", (e, v) => {
        setHotKeyFun2(v)
    })
}


const state = {}
const setHotKeyFun2 = function (hotKey) {

    if (!globalShortcut || !hotKey) return;
    if (state.hotKey_val && state.hotKey_val == hotKey) return;

    //如果之前注册成功了快捷键,那么解除该快捷键
    if (state.hotKey_val && state.hotKey_val != "无") globalShortcut.unregister(state.hotKey_val)
    if (!hotKey || hotKey == "无") return

    //console.log("快捷键注册", hotKey)
    let bool = globalShortcut.register(hotKey, () => {
        mainWindow.send("refresh-shortcut", hotKey)
        if(state.callback){
            state.callback()
        }
    })

    if (bool) {
        let msg = "设置快捷键成功: " + hotKey
        if(state.hotKey_val) mainWindow.send("show-success-message", msg)
        state.hotKey_val = hotKey + "";
    } else {
        let msg = "设置刷新快捷键: " + hotKey + " 失败, 请检查是否有软件快捷键冲突, 或者到设置中重新设置一个不同的快捷键."
        mainWindow.send("alert-message", msg)
        console.error(msg)
        //state.hotKey = state.hotKey_val || "无"
    }
    state.hotKey_val = hotKey + ""
}
