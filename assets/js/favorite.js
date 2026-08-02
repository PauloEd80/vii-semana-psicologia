/**
 * Alterna e persiste (localStorage) o estado de "favorito" do evento no navegador do visitante.
 */

const STORAGE_KEY = 'vii-semana-psicologia:favorito';
const button = document.getElementById('favoriteBtn');

function applyState(isFavorite) {
  button.setAttribute('aria-pressed', String(isFavorite));
  const label = button.querySelector('.favorite-label');
  if (label) {
    label.textContent = isFavorite ? 'Adicionado aos favoritos' : 'Adicionar aos favoritos';
  }
}

if (button) {
  const stored = localStorage.getItem(STORAGE_KEY) === 'true';
  applyState(stored);

  button.addEventListener('click', () => {
    const next = button.getAttribute('aria-pressed') !== 'true';
    localStorage.setItem(STORAGE_KEY, String(next));
    applyState(next);
  });
}
