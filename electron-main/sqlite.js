
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

const DB = function (file = "sqlite3_201909.db") {
	this.db = new sqlite3.Database(file);
	let exist = fs.existsSync(file);
	if(!exist){
		console.log("Creating db file!");
		fs.openSync(file, 'w');
	};
};


DB.prototype.printErrorInfo = function(err){
	console.log("Error Message:" + err.message + " ErrorNumber:" + errno);
};

/**
 * 新建表方法:
 * 例子:
 * create table user (id INT,name VARCHAR,password VARCHAR)
 * create table if not exists tiles(level INTEGER, column INTEGER, row INTEGER, content BLOB);
 * @param sql
 */
DB.prototype.createTable = function(sql, callback){
	const db = this.db;
	const self = this;
	db.serialize(function(){
		db.run(sql, function(err){
			if(null != err){
				self.printErrorInfo(err);
				if(callback) callback(err);
				return;
			}
		});
	});
};

/// tilesData format; [[level, column, row, content], [level, column, row, content]]
DB.prototype.insertList = function(sql, objects, callback){
	const db = this.db;
	const self = this;
	db.serialize(function(){
		var stmt = db.prepare(sql);
		for(var i = 0; i < objects.length; ++i){
			stmt.run(objects[i], (err) =>{
				if(callback) callback(err)
			});
		}
		stmt.finalize();
	});
};

DB.prototype.insert = function(sql, arrParams, callback){
	const db = this.db;
	const self = this;
	db.serialize(function(){
		var stmt = db.prepare(sql);
		stmt.run(arrParams, (err) =>{
			if(callback) callback(err)
		});
		stmt.finalize();
	});
};

DB.prototype.select = function(sql, callback){
	const db = this.db;
	const self = this;
	self.db.all(sql, function(err, rows){
		if(null != err){
			self.printErrorInfo(err);
			return;
		}
		
		/// deal query data.
		if(callback){
			callback(rows);
		}
	});
};

DB.prototype.executeSql = function(sql, callback){
	const db = this.db;
	const self = this;
	db.run(sql, function(err){
		if(null != err){
			self.printErrorInfo(err);
			if(callback) callback(err)
		}
	});
};

DB.prototype.close = function(){
	this.db.close();
};


/// export SqliteDB. 使用方法: new DB().insert(xxxx);
module.exports = DB;


