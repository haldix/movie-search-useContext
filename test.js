function formatKeywords(words) {
  const arr = words
    .split(' ')
    .filter((w) => w !== '')
    .join('+');

  console.log(arr);
}
formatKeywords('Hal    Dix james');
