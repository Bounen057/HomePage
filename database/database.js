var sqlite3 = require("sqlite3").verbose()
var db = new sqlite3.Database(":memory:")

db.serialize(function() {
    db.run("CREATE TABLE team (info TEXT)")

    // データを登録する。
    var stmt = db.prepare("INSERT INTO team VALUES (?)");
    for (var i = 0; i < 10; i++)
        stmt.run("team " + i);
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM team", function (err, row) {
        console.log(row.id + " : " + row.info);
    });
});

db.close();