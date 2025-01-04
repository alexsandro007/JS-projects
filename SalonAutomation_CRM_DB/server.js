const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Путь к базе данных
const dbPath = path.join(__dirname, 'database', 'cosmetology_salon.db');

// Подключение к базе данных
const db = new sqlite3.Database(dbPath);

// Обслуживание статических файлов
app.use(express.static('public'));

// Функция для получения первичного ключа таблицы
function getPrimaryKey(tableName, callback) {
    db.all(
        `PRAGMA table_info(${tableName})`,
        [],
        (err, rows) => {
            if (err || !rows || rows.length === 0) {
                console.error(`Ошибка определения ключа таблицы ${tableName}:`, err);
                callback(null);
            } else {
                const primaryKeyColumn = rows.find(row => row.pk === 1); // Найти столбец с флагом pk = 1
                callback(primaryKeyColumn ? primaryKeyColumn.name : null);
            }
        }
    );
}

// API для получения данных из таблиц
app.get('/getData/:table', (req, res) => {
    const tableName = req.params.table;

    db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка при получении данных' });
            return;
        }
        res.json(rows);
    });
});

// API для добавления данных
app.post('/addData/:table', express.json(), (req, res) => {
    const tableName = req.params.table;
    const columns = Object.keys(req.body).join(', ');
    const placeholders = Object.keys(req.body).map(() => '?').join(', ');
    const values = Object.values(req.body);

    db.run(
        `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`,
        values,
        function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Ошибка добавления' });
                return;
            }
            res.json({ success: true, id: this.lastID });
        }
    );
});

// API для редактирования данных
app.put('/editData/:table/:id', express.json(), (req, res) => {
    const tableName = req.params.table;
    const id = req.params.id;

    getPrimaryKey(tableName, primaryKey => {
        if (!primaryKey) {
            res.status(400).json({ error: 'Не удалось определить первичный ключ' });
            return;
        }

        const updates = Object.entries(req.body)
            .map(([key, value]) => `${key} = ?`)
            .join(', ');

        const values = [...Object.values(req.body), id];

        db.run(
            `UPDATE ${tableName} SET ${updates} WHERE ${primaryKey} = ?`,
            values,
            function (err) {
                if (err) {
                    console.error('Ошибка редактирования:', err);
                    res.status(500).json({ error: 'Ошибка редактирования' });
                    return;
                }
                res.json({ success: true });
            }
        );
    });
});

// API для удаления данных
app.delete('/deleteData/:table/:id', (req, res) => {
    const tableName = req.params.table;
    const id = req.params.id;

    getPrimaryKey(tableName, primaryKey => {
        if (!primaryKey) {
            res.status(400).json({ error: 'Не удалось определить первичный ключ' });
            return;
        }

        db.run(`DELETE FROM ${tableName} WHERE ${primaryKey} = ?`, [id], function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Ошибка удаления' });
                return;
            }
            res.json({ success: true });
        });
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
