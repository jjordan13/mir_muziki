document.addEventListener('DOMContentLoaded', function() {
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const notificationSound = document.getElementById('notification-sound');
    notificationSound.volume = 0.2;
    const randomNames = ["MozartLover", "Rocker1999", "GuitarHero", "BassMaster", "JazzCat", "SymphonyFan", "DrummerBoy"];
    const randomPhrases = [
        "Кто знает, где купить хорошие струны?",
        "Вчера слушал Вивальди, это просто космос!",
        "Ребята, рок жив или уже нет?",
        "Посоветуйте музыку для тренировки.",
        "Учусь играть на пианино, пальцы болят :(",
        "Slipknot - легенды!",
        "А вы знали, что Бах писал музыку в тюрьме?",
        "Ищу барабанщика в группу, Москва.",
        "Какой ваш любимый альбом Pink Floyd?",
        "Почему современная попса такая одинаковая?"
    ];
    function playNotification() {
        notificationSound.currentTime = 0;
        notificationSound.play().catch(error => {
            console.log("Звук уведомления заблокирован браузером.");
        });
    }
    function addMessage(text, type, name = "Вы") {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        if (type === 'user') {
            msgDiv.classList.add('user-message');
        } else {
            msgDiv.classList.add('bot-message');
        }
        const now = new Date();
        const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        msgDiv.innerHTML = `
            <div class="msg-header">${name} <span class="time">${timeString}</span></div>
            <div class="msg-text">${text}</div>
        `;
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        playNotification();
    }
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (text !== "") {
            addMessage(text, 'user');
            chatInput.value = "";
        }
    });
    setInterval(function() {
        const randName = randomNames[Math.floor(Math.random() * randomNames.length)];
        const randPhrase = randomPhrases[Math.floor(Math.random() * randomPhrases.length)];
        addMessage(randPhrase, 'bot', randName);
    }, 7000);
});