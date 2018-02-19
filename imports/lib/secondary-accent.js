export function secondaryAccentGenerator(jokerFactor) {
  if (['Q', 'A', 'Z', 'W', 'S', 'X', '1'].indexOf(jokerFactor) > 0) {
    return '#FC466B'; // vividSublime
  } else if (['E', 'D', 'C', 'R', 'F', 'V', '2'].indexOf(jokerFactor) > 0) {
    return '#FFD200'; // learningAndLeading
  } else if (['T', 'G', 'B', 'Y', 'H', 'N', '3'].indexOf(jokerFactor) > 0) {
    return '#20e3b2'; // subu
  } else if (['U', 'J', 'M', 'I', 'K', 'O', '4'].indexOf(jokerFactor) > 0) {
    return '#12D8FA'; // stripe
  }
  return '#74ebd5'; // digitalWater
}
