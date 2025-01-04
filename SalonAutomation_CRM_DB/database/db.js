const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Путь к базе данных
const dbPath = path.join(__dirname, '..', 'database', 'cosmetology_salon.db');

// Подключение к базе данных
const db = new sqlite3.Database(dbPath);

// Функция для получения данных из таблицы
function getDataFromTable(tableName, callback) {
    db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }
        callback(rows);
    });
}

module.exports = {
    getDataFromTable
};
