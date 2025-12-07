document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bg-music');
    const logo = document.getElementById('music-control');
    music.volume = 0.07;
    const savedTime = localStorage.getItem('musicTime');
    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    }
    function playAudio() {
        music.play().then(() => {
            logo.classList.add('playing');
            localStorage.setItem('musicPlaying', 'true');
        }).catch(error => {
            console.log("Автозапуск заблокирован браузером. Ждем взаимодействия.");
        });
    }
    function pauseAudio() {
        music.pause();
        logo.classList.remove('playing');
        localStorage.setItem('musicPlaying', 'false');
    }
    const shouldPlay = localStorage.getItem('musicPlaying');
    if (shouldPlay === 'true' || shouldPlay === null) {
        playAudio();
        document.addEventListener('click', function unlockAudio() {
            if (music.paused && localStorage.getItem('musicPlaying') !== 'false') {
                playAudio();
            }
        }, { once: true });
    }
    logo.addEventListener('click', function(e) {
        e.stopPropagation();
        if (music.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
    });
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('musicTime', music.currentTime);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const instrumentImages = document.querySelectorAll('.gallery-item img');
    let currentSound = null;
    instrumentImages.forEach(img => {
        img.addEventListener('click', function() {
            const audioFile = this.getAttribute('data-audio');
            if (audioFile) {
                if (currentSound) {
                    currentSound.pause();
                    currentSound.currentTime = 0;
                }
                currentSound = new Audio(audioFile);
                currentSound.play().catch(error => {
                    console.log("Ошибка воспроизведения (проверьте наличие файла):", error);
                });
            }
        });
    });
});