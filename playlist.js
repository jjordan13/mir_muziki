document.addEventListener('DOMContentLoaded', () => {
    let tracksArray = [
        { name: "Linkin Park - Numb", plays: 154, id: 1 },
        { name: "Queen - Bohemian Rhapsody", plays: 89, id: 2 },
        { name: "Hans Zimmer - Interstellar", plays: 42, id: 3 },
        { name: "Rick Astley - Never Gonna Give You Up", plays: 999, id: 4 }
    ];

    let nextId = 5;
    let displayedArray = [...tracksArray];

    const trackInput = document.getElementById('trackInput');
    const trackList = document.getElementById('trackList');
    const countDisplay = document.getElementById('countDisplay');
    const totalPlaysDisplay = document.getElementById('totalPlaysDisplay');

    const addBtn = document.getElementById('addBtn');
    const clearBtn = document.getElementById('clearBtn');

    const filterMin = document.getElementById('filterMin');
    const filterMax = document.getElementById('filterMax');
    const filterBtn = document.getElementById('filterBtn');
    const resetFilterBtn = document.getElementById('resetFilterBtn');
    const sortAscBtn = document.getElementById('sortAscBtn');
    const sortDescBtn = document.getElementById('sortDescBtn');


    function renderList() {
        trackList.innerHTML = '';
        countDisplay.textContent = displayedArray.length;
        const total = displayedArray.reduce((sum, track) => sum + track.plays, 0);
        totalPlaysDisplay.textContent = total;

        if (displayedArray.length === 0) {
            trackList.innerHTML = '<li class="empty-message">Список пуст или ничего не найдено.</li>';
            return;
        }

        displayedArray.forEach((track) => {
            const li = document.createElement('li');
            li.className = 'track-item';

            const infoSpan = document.createElement('span');
            infoSpan.className = 'track-info';
            infoSpan.textContent = track.name;

            const counterDiv = document.createElement('div');
            counterDiv.className = 'counter-wrapper';

            const minusBtn = document.createElement('button');
            minusBtn.className = 'counter-btn';
            minusBtn.textContent = '-';
            minusBtn.onclick = () => changePlays(track.id, -1);

            const playsSpan = document.createElement('span');
            playsSpan.className = 'plays-count';
            playsSpan.textContent = track.plays;

            const plusBtn = document.createElement('button');
            plusBtn.className = 'counter-btn';
            plusBtn.textContent = '+';
            plusBtn.onclick = () => changePlays(track.id, 1);

            counterDiv.appendChild(minusBtn);
            counterDiv.appendChild(playsSpan);
            counterDiv.appendChild(plusBtn);

            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'actions-group';

            const editBtn = document.createElement('span');
            editBtn.innerHTML = '&#9998;';
            editBtn.className = 'edit-icon';
            editBtn.title = 'Заменить трек';
            editBtn.onclick = () => replaceTrack(track.id);

            const deleteBtn = document.createElement('span');
            deleteBtn.innerHTML = '&#128465;';
            deleteBtn.className = 'delete-icon';
            deleteBtn.title = 'Удалить';
            deleteBtn.onclick = () => deleteTrack(track.id);

            actionsDiv.appendChild(editBtn);
            actionsDiv.appendChild(deleteBtn);

            li.appendChild(infoSpan);
            li.appendChild(counterDiv);
            li.appendChild(actionsDiv);
            trackList.appendChild(li);
        });
    }

    function refreshData() {
        displayedArray = [...tracksArray];
        renderList();
    }

    function filterByRange(arr, a, b) {
        return arr.filter(item => item.plays >= a && item.plays <= b);
    }

    filterBtn.addEventListener('click', () => {
        const min = parseInt(filterMin.value) || 0;
        const max = parseInt(filterMax.value) || Infinity;
        displayedArray = filterByRange(tracksArray, min, max);
        renderList();
    });

    resetFilterBtn.addEventListener('click', () => {
        filterMin.value = '';
        filterMax.value = '';
        refreshData();
    });

    function sortTracks(arr, order) {
        const newArr = [...arr];
        if (order === 'asc') newArr.sort((a, b) => a.plays - b.plays);
        else newArr.sort((a, b) => b.plays - a.plays);
        return newArr;
    }

    sortAscBtn.addEventListener('click', () => {
        displayedArray = sortTracks(displayedArray, 'asc');
        renderList();
    });

    sortDescBtn.addEventListener('click', () => {
        displayedArray = sortTracks(displayedArray, 'desc');
        renderList();
    });

    function addTrack() {
        const text = trackInput.value.trim();
        if (text) {
            tracksArray.push({ name: text, plays: 1, id: nextId++ });
            trackInput.value = '';
            refreshData();
            filterMin.value = ''; filterMax.value = '';
        } else {
            alert('Введите название!');
        }
    }

    function replaceTrack(id) {
        const track = tracksArray.find(t => t.id === id);
        if (!track) return;

        const newName = prompt(`На что заменить трек "${track.name}"?`, track.name);

        if (newName !== null && newName.trim() !== "") {
            track.name = newName.trim();
            track.plays = 1;
            alert('Трек успешно обновлен!');
            renderList();
        }
    }

    function changePlays(id, amount) {
        const track = tracksArray.find(t => t.id === id);
        if (track) {
            track.plays += amount;
            if (track.plays < 0) track.plays = 0;
            renderList();
        }
    }

    function deleteTrack(id) {
        if(confirm('Вы уверены, что хотите удалить этот трек?')) {
            tracksArray = tracksArray.filter(t => t.id !== id);
            displayedArray = displayedArray.filter(t => t.id !== id);
            renderList();
        }
    }

    function clearList() {
        if(confirm('Удалить всю историю?')) {
            tracksArray = [];
            refreshData();
        }
    }

    addBtn.addEventListener('click', addTrack);
    clearBtn.addEventListener('click', clearList);
    trackInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTrack(); });

    refreshData();
});


document.addEventListener('DOMContentLoaded', () => {
    const createListBtn = document.getElementById('createListBtn');
    const userListContainer = document.getElementById('user-generated-list');

    if (createListBtn && userListContainer) {
        console.log("Кнопка найдена, вешаем обработчик...");
        createListBtn.addEventListener('click', function() {
            userListContainer.innerHTML = '';
            while (true) {
                let userInput = prompt("Введите пункт списка (Esc или пусто для выхода):");
                if (userInput === null || userInput.trim() === "") {
                    break;
                }
                const li = document.createElement('li');
                li.textContent = userInput;
                userListContainer.appendChild(li);
            }
            if (userListContainer.children.length > 0) {
                showNotification({ content: "Список успешно создан!" });
            } else {
                showNotification({ content: "Создание списка отменено" });
            }
        });
    } else {
        console.warn("Элементы для Задания 3 не найдены в HTML (createListBtn или user-generated-list).");
    }
});