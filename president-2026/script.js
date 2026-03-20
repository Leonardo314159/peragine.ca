// Existing Dark Mode Logic
const toggle = document.getElementById('darkModeToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if(toggle) toggle.checked = true;
}

if (toggle) {
    toggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
}

// --- NEW: Countdown Logic ---
function updateCountdown() {
    // Target: Monday, March 23, 2026 at 9:00 AM
    const targetDate = new Date("March 23, 2026 09:00:00").getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    const display = document.getElementById("countdown");
    if (!display) return;

    if (distance < 0) {
        display.innerHTML = "VOTING IS OPEN!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    display.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();