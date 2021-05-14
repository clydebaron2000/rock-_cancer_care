var connection = require("./connection.js");
var orm = {
  selectAll: function(table, callback) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [table], function(err, result) {
      if (err) throw err;
      callback(result);
    });
  },
  insertOne: function(table, cols, vals, callback) {
    const qmarks = [...Array(vals.length)].map(empty => "?").join();
    var queryString = `insert into ${table} (${cols.join()}) values (${qmarks})`;
    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      callback(result);
    });
  },
  updateOne: function(table, colobj, condition, callback) {
    var colvals = Object.keys(colobj).map(key => {
      if (Object.hasOwnProperty.call(colobj, key)) {
        if (colobj[key] === "true" || colobj[key] === "false") return `${key}=${(colobj[key]==="true")?true:false}`
        else if (typeof colobj[key] === "string") return `${key}='${colobj[key]}'`;
        else return `${key}=${colobj[key]}`;
      }
    }).join();
    var queryString = `update ${table} set ${colvals} where ${condition}`;
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      callback(result);
    });
  },
  deleteOne: function(table, id, callback) {
    connection.query(`delete from ${table} where id=${id}`, function(err, result) {
      if (err) throw err;
      callback(result);
    });
  }
};
module.exports = orm;