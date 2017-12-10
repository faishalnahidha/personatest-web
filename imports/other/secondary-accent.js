const colors = ['#FC466B', '#FFD200', '#20e3b2', '#12D8FA', '#74ebd5'];

const vividSublime = ['Q', 'A', 'Z', 'W', 'S', 'X'];
const learningAndLeading = ['E', 'D', 'C', 'R', 'F', 'V'];
const subu = ['T', 'G', 'B', 'Y', 'H', 'N'];
const stripe = ['U', 'J', 'M', 'I', 'K', 'O'];

export const secondaryAccentGenerator = joker => {
  if (vividSublime.indexOf(joker) > 0) {
    return colors[0];
  } else if (learningAndLeading.indexOf(joker) > 0) {
    return colors[1];
  } else if (subu.indexOf(joker) > 0) {
    return colors[2];
  } else if (stripe.indexOf(joker) > 0) {
    return colors[3];
  } else {
    return colors[4];
  }
};
