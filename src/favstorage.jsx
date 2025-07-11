const FAVOURITES_KEY = 'calculator_favourites';

export function getFavouritesFromStorage() {
  const stored = localStorage.getItem(FAVOURITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveFavouritesToStorage(favList) {
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favList));
}
