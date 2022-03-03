export default function findGenres(array) {
  const genres = [];

  for (const emotion of array) {
    if (emotion[0] === 'happy') {
      if (emotion[1] > 0 && emotion[1] <= 0.33) {
        genres.push(['acoustic', 0.6]);
      }
      if (emotion[1] > 0.33 && emotion[1] <= 0.66) {
        genres.push(['dance', 0.8]);
      }
      if (emotion[1] > 0.66 && emotion[1] <= 1) {
        genres.push(['happy', 1]);
      }
    }
    if (emotion[0] === 'sad') {
      if (emotion[1] > 0 && emotion[1] <= 0.33) {
        genres.push(['sad', 0.5]);
      }
      if (emotion[1] > 0.33 && emotion[1] <= 0.66) {
        genres.push(['rainy-day', 0.3]);
      }
      if (emotion[1] > 0.66 && emotion[1] <= 1) {
        genres.push(['sad', 0.1]);
      }
    }
    if (emotion[0] === 'angry') {
      if (emotion[1] > 0 && emotion[1] <= 0.33) {
        genres.push(['folk', 0.5]);
      }
      if (emotion[1] > 0.33 && emotion[1] <= 0.66) {
        genres.push(['hardstyle', 0.3]);
      }
      if (emotion[1] > 0.66 && emotion[1] <= 1) {
        genres.push(['hip-hop', 0.1]);
      }
    }
    if (emotion[0] === 'disgusted') {
      if (emotion[1] > 0 && emotion[1] <= 0.33) {
        genres.push(['alternative', 0.5]);
      }
      if (emotion[1] > 0.33 && emotion[1] <= 0.66) {
        genres.push(['club', 0.3]);
      }
      if (emotion[1] > 0.66 && emotion[1] <= 1) {
        genres.push(['drum-and-bass', 0.1]);
      }
    }
    if (emotion[0] === 'surprised') {
      if (emotion[1] > 0 && emotion[1] <= 0.33) {
        genres.push(['guitar', 0.4]);
      }
      if (emotion[1] > 0.33 && emotion[1] <= 0.66) {
        genres.push(['k-pop', 0.5]);
      }
      if (emotion[1] > 0.66 && emotion[1] <= 1) {
        genres.push(['k-pop', 0.6]);
      }
    }
    if (emotion[0] === 'fearful') {
      if (emotion[1] > 0 && emotion[1] <= 0.33) {
        genres.push(['house', 0.3]);
      }
      if (emotion[1] > 0.33 && emotion[1] <= 0.66) {
        genres.push(['goth', 0.2]);
      }
      if (emotion[1] > 0.66 && emotion[1] <= 1) {
        genres.push(['funk', 0.1]);
      }
    }
    if (emotion[0] === 'neutral') {
      if (emotion[1] > 0 && emotion[1] <= 0.33) {
        genres.push(['jazz', 0.5]);
      }
      if (emotion[1] > 0.33 && emotion[1] <= 0.66) {
        genres.push(['soul', 0.6]);
      }
      if (emotion[1] > 0.66 && emotion[1] <= 1) {
        genres.push(['r-n-b', 0.7]);
      }
    }
  }

  if (genres.length === 1) {
    return { genre: [genres[0][0]], valence: genres[0][1] };
  }

  const valence = (genres[0][1] + genres[1][1]) / 2;

  if (genres[0][0] === genres[1][0]) {
    return { genre: [genres[0][0]], valence: valence };
  }

  return { genre: [genres[0][0], genres[1][0]], valence: valence };
}
