const mysql = require('mysql');

// 连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '0000000000',
  database: 'blog',
  connectionLimit: 20,
  multipleStatements: true
});
exports.query = function (sql, arr, callback) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    // connection -> 在连接池中申请到的，可用的 连接资源
    connection.query(sql, arr, function (err, results, fields) {
      // 释放资源 -> 把当前的连接资源返回给连接池
      connection.release();
      if (err) throw err;
      callback && callback(results, fields);
    });
  });
};
