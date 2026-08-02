/**
 * Contador regressivo para o início do evento.
 * Data alvo: 25/08/2026 às 18h00 (horário de credenciamento), horário de Brasília.
 */

const EVENT_DATE = new Date('2026-08-25T18:00:00-03:00');

const elements = {
  days: document.getElementById('cd-days'),
  hours: document.getElementById('cd-hours'),
  minutes: document.getElementById('cd-minutes'),
};

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateCountdown() {
  const now = new Date();
  const diff = EVENT_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    elements.days.textContent = '00';
    elements.hours.textContent = '00';
    elements.minutes.textContent = '00';
    return;
  }

  const totalMinutes = Math.floor(diff / 1000 / 60);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  elements.days.textContent = pad(days);
  elements.hours.textContent = pad(hours);
  elements.minutes.textContent = pad(minutes);
}

if (elements.days && elements.hours && elements.minutes) {
  updateCountdown();
  setInterval(updateCountdown, 1000 * 30);
}
