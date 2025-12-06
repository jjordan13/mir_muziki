(function() {
    // проверка на пустой объект
    function isEmpty(obj) {
        if (obj === null || obj === undefined) return true;
        if (typeof obj === 'string') return obj.trim() === '';
        if (typeof obj === 'object') {
            return Object.keys(obj).length === 0;
        }
        return false;
    }

    // генерация случайной строки
    function generateLetterCaptcha() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return captcha;
    }

    // генерация мат. капчи
    function generateMathCaptcha() {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        return {
            num1: num1,
            num2: num2,
            answer: num1 + num2
        };
    }

    // инициализация капчи
    let currentCaptcha = generateLetterCaptcha();
    let mathCaptcha = null;
    let captchaType = 'letter';
    let captchaVerified = false;

    const feedbackForm = document.querySelector('.feedback-form');
    const submitButton = feedbackForm.querySelector('button[type="submit"]');

    // контейнер для капчи
    const captchaContainer = document.createElement('div');
    captchaContainer.className = 'captcha-container';
    captchaContainer.innerHTML = `
        <div style="margin-bottom: 10px;">
            <label for="captchaInput">
                Проверка безопасности:
            </label>
            <div id="captchaDisplay">${currentCaptcha}</div>
            <input
                type="text"
                id="captchaInput"
                placeholder="Введите символы с картинки"
            >
            <div id="captchaError"></div>
            <div id="captchaSuccess"></div>
        </div>
        <button type="button" id="verifyCaptcha">Проверить</button>
        <button type="button" id="refreshCaptcha">Обновить капчу</button>
    `;

    const formActions = feedbackForm.querySelector('.form-actions');
    formActions.parentNode.insertBefore(captchaContainer, formActions);

    submitButton.disabled = true;
    submitButton.style.opacity = '0.5';
    submitButton.style.cursor = 'not-allowed';

    const captchaDisplay = document.getElementById('captchaDisplay');
    const captchaInput = document.getElementById('captchaInput');
    const captchaError = document.getElementById('captchaError');
    const captchaSuccess = document.getElementById('captchaSuccess');
    const verifyButton = document.getElementById('verifyCaptcha');
    const refreshButton = document.getElementById('refreshCaptcha');

    function refreshCaptcha() {
        captchaInput.value = '';
        captchaError.style.display = 'none';
        captchaSuccess.style.display = 'none';
        if (captchaType === 'letter') {
            currentCaptcha = generateLetterCaptcha();
            captchaDisplay.textContent = currentCaptcha;
            captchaInput.placeholder = 'Введите символы с картинки';
        } else {
            mathCaptcha = generateMathCaptcha();
            captchaDisplay.textContent = `${mathCaptcha.num1} + ${mathCaptcha.num2} = ?`;
            captchaInput.placeholder = 'Введите ответ';
        }
    }

    // проверка капчи
    function verifyCaptcha() {
        const userInput = captchaInput.value;

        // пустой ввод
        if (isEmpty(userInput)) {
            captchaError.textContent = 'Ошибка: поле не может быть пустым!';
            captchaError.style.display = 'block';
            captchaSuccess.style.display = 'none';
            return;
        }

        if (captchaType === 'letter') {
            // буквы
            if (userInput === currentCaptcha) {
                captchaSuccess.textContent = '✓ Капча пройдена успешно!';
                captchaSuccess.style.display = 'block';
                captchaError.style.display = 'none';
                captchaVerified = true;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                submitButton.style.cursor = 'pointer';
                captchaInput.disabled = true;
                verifyButton.disabled = true;
                refreshButton.disabled = true;
            } else {
                captchaError.textContent = 'Неверный ввод! Попробуйте математическую капчу.';
                captchaError.style.display = 'block';
                captchaSuccess.style.display = 'none';
                captchaType = 'math';
                mathCaptcha = generateMathCaptcha();
                captchaDisplay.textContent = `${mathCaptcha.num1} + ${mathCaptcha.num2} = ?`;
                captchaInput.value = '';
                captchaInput.placeholder = 'Введите ответ';
            }
        } else {
            // мат. капчи
            const userAnswer = parseInt(userInput);
            if (isNaN(userAnswer)) {
                captchaError.textContent = 'Ошибка: введите число!';
                captchaError.style.display = 'block';
                captchaSuccess.style.display = 'none';
                return;
            }
            if (userAnswer === mathCaptcha.answer) {
                captchaSuccess.textContent = '✓ Капча пройдена успешно!';
                captchaSuccess.style.display = 'block';
                captchaError.style.display = 'none';
                captchaVerified = true;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                submitButton.style.cursor = 'pointer';
                captchaInput.disabled = true;
                verifyButton.disabled = true;
                refreshButton.disabled = true;
            } else {
                captchaError.textContent = 'Неверный ответ! Попробуйте еще раз.';
                captchaError.style.display = 'block';
                captchaSuccess.style.display = 'none';
                refreshCaptcha();
            }
        }
    }

    verifyButton.addEventListener('click', verifyCaptcha);
    refreshButton.addEventListener('click', refreshCaptcha);
    captchaInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            verifyCaptcha();
        }
    });

    feedbackForm.addEventListener('submit', function(e) {
        if (!captchaVerified) {
            e.preventDefault();
            captchaError.textContent = 'Пожалуйста, пройдите проверку капчи!';
            captchaError.style.display = 'block';
            captchaInput.focus();
        }
    });
})();