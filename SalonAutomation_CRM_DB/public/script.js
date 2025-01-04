// Список документов для каждого типа
const documentTypes = {
    'справочные': ['Категории_услуг', 'Услуги', 'Сотрудники', 'Клиенты'],
    'оперативные': ['Записи_на_услуги', 'Акции_и_скидки'],
    'отчетные': ['Общая_статистика_по_услугам', 'Анализ_эффективности_акций']
};

// Функция для отображения кнопок документов в зависимости от выбранного типа
function showDocuments(type) {
    const documentsList = document.getElementById('documents-list');
    documentsList.innerHTML = ''; // Очистить список кнопок

    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = ''; // Очистить предыдущую таблицу, если она была отображена

    documentTypes[type].forEach(doc => {
        const button = document.createElement('button');
        button.innerText = doc;
        button.onclick = () => showTable(doc);
        documentsList.appendChild(button);
    });
}

// Функция для отображения таблицы с данными из базы данных
function showTable(docName) {
    fetch(`/getData/${docName}`)
        .then(response => response.json())
        .then(data => {
            const tableContainer = document.getElementById('table-container');
            tableContainer.innerHTML = ''; // Очистить предыдущую таблицу

            if (data.length === 0) {
                tableContainer.innerText = 'Нет данных для отображения.';
                return;
            }

            const table = document.createElement('table');
            table.className = 'data-table';
            const header = document.createElement('thead');
            const headerRow = document.createElement('tr');

            // Создание заголовков для таблицы
            const columns = Object.keys(data[0]);
            columns.forEach(col => {
                const th = document.createElement('th');
                th.innerText = col;
                headerRow.appendChild(th);
            });
            header.appendChild(headerRow);
            table.appendChild(header);

            const tbody = document.createElement('tbody');
            data.forEach(row => {
                const tr = document.createElement('tr');
                columns.forEach(col => {
                    const td = document.createElement('td');
                    td.innerText = row[col];
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });

            table.appendChild(tbody);
            tableContainer.appendChild(table);

            // Добавляем кнопки управления
            createActions(docName, tableContainer);
        })
        .catch(error => {
            console.error('Ошибка загрузки данных:', error);
        });
}

// Функция для создания кнопок управления
function createActions(docName, container) {
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'actions-container';

    const addButton = document.createElement('button');
    addButton.innerText = 'Добавить';
    addButton.onclick = () => handleAdd(docName);

    const editButton = document.createElement('button');
    editButton.innerText = 'Редактировать';
    editButton.onclick = () => handleEdit(docName);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Удалить';
    deleteButton.onclick = () => handleDelete(docName);

    actionsContainer.appendChild(addButton);
    actionsContainer.appendChild(editButton);
    actionsContainer.appendChild(deleteButton);

    container.appendChild(actionsContainer);
}

// Общая функция для открытия модального окна
function openModal(title, fields, onSubmit) {
    // Удалить предыдущие модальные окна, если они открыты
    const existingModal = document.getElementById('modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const modalTitle = document.createElement('h2');
    modalTitle.innerText = title;
    modalContent.appendChild(modalTitle);

    const form = document.createElement('form');
    form.className = 'modal-form';

    fields.forEach(field => {
        const label = document.createElement('label');
        label.innerText = field.label;
        const input = document.createElement('input');
        input.type = 'text';
        input.name = field.name;
        input.required = true;
        form.appendChild(label);
        form.appendChild(input);
    });

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'modal-buttons';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Сохранить';
    buttonsContainer.appendChild(submitButton);

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.innerText = 'Закрыть';
    closeButton.onclick = () => modal.remove();
    buttonsContainer.appendChild(closeButton);

    form.appendChild(buttonsContainer);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    form.onsubmit = event => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
        modal.remove();
    };
}

// Функции для обработки операций (Добавить, Редактировать, Удалить)
function handleAdd(docName) {
    fetch(`/getData/${docName}`)
        .then(response => response.json())
        .then(data => {
            const fields = data.length > 0 
                ? Object.keys(data[0]).map(col => ({ label: col, name: col }))
                : [{ label: 'Поле 1', name: 'field1' }]; // Заглушка, если таблица пустая

            openModal(`Добавить данные в ${docName}`, fields, newData => {
                fetch(`/addData/${docName}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newData),
                })
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) showTable(docName);
                    })
                    .catch(error => console.error('Ошибка добавления:', error));
            });
        });
}

function handleEdit(docName) {
    fetch(`/getData/${docName}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                alert('Нет данных для редактирования');
                return;
            }

            const fields = Object.keys(data[0]).map(col => ({ label: col, name: col }));
            fields.unshift({ label: 'ID записи (ключ)', name: 'id' });

            openModal(`Редактировать данные в ${docName}`, fields, updatedData => {
                const id = updatedData.id;
                delete updatedData.id; // Убираем ID из обновляемых данных

                fetch(`/editData/${docName}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedData),
                })
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            showTable(docName);
                        } else {
                            alert('Ошибка при редактировании');
                        }
                    })
                    .catch(error => console.error('Ошибка редактирования:', error));
            });
        });
}

function handleDelete(docName) {
    openModal(
        `Удалить данные из ${docName}`,
        [{ label: 'ID записи', name: 'id' }],
        deleteData => {
            fetch(`/deleteData/${docName}/${deleteData.id}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) showTable(docName);
                })
                .catch(error => console.error('Ошибка удаления:', error));
        }
    );
}