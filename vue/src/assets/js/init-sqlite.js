
// 引入ipcRenderer
const {remote} = window.require('electron')
window.__main= remote.getGlobal("__main");
var SqliteDB = remote.require(`${__main}/sqlite`);
var file = "sqlite3_201909.db";
console.debug("生成数据库文件(存在则不生成):", file)
window.sqliteDB = new SqliteDB(file);
console.debug("sqliteDB-init:", sqliteDB)

// 发送同步消息，返回给变量replay，在等待主进程返回中，会阻止其他操作
/*const reply = ipcRenderer.sendSync('synchronous-message', 'ping')
console.log(reply)
*/
