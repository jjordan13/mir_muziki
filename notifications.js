document.addEventListener('DOMContentLoaded', () => {
    const notificationDropdown = document.querySelector('.notifications-dropdown');
    const notificationCount = document.querySelector('.notification-count');
    const notificationList = document.querySelector('.dropdown-content ul');
    const mockNotifications = [
        { icon: '❗', text: 'Вас упомянули в чате' },
        { icon: '🚀', text: 'Система обновлена' },
        { icon: '⚠️', text: 'Попытка входа в аккаунт' }
    ];
    let intervalId = null;
    let isPaused = false;
    function addNewNotification() {
        const randomNotif = mockNotifications[Math.floor(Math.random() * mockNotifications.length)];
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="notification-item">
                <span class="notification-icon-small">${randomNotif.icon}</span>
                <span class="notification-text">${randomNotif.text}</span>
                <span class="notification-time">Только что</span>
            </div>
        `;
        notificationList.insertBefore(li, notificationList.firstChild);
        let currentCount = parseInt(notificationCount.textContent) || 0;
        notificationCount.textContent = ++currentCount;
        notificationCount.style.transform = 'scale(1.3)';
        setTimeout(() => notificationCount.style.transform = 'scale(1)', 200);
        showNotification({ content: "Получено новое уведомление!" });
    }
    function startTimer() {
        intervalId = setInterval(addNewNotification, 7000);
    }
    startTimer();
    function pauseDecorator(func, delay) {
        return function() {
            if (isPaused) return;
            isPaused = true;
            clearInterval(intervalId);
            const oldColor = notificationCount.style.backgroundColor;
            notificationCount.style.backgroundColor = '#888';
            showNotification({ content: "Уведомления приостановлены на 10 сек" });
            setTimeout(() => {
                func();
                isPaused = false;
                notificationCount.style.backgroundColor = oldColor;
                showNotification({ content: "Уведомления возобновлены" });
            }, delay);
        };
    }
    notificationDropdown.addEventListener('click', pauseDecorator(startTimer, 10000));
    function showNotification(options) {
        const notification = document.createElement('div');
        notification.className = 'notification-popup';
        notification.textContent = options.content;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 10000);
    }
    window.showNotification = showNotification;
});