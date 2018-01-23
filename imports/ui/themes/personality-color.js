export const personalityColor = {
  green: '#2ecc71',
  green2: '#019875',
  red: '#e74c3c',
  red2: '#c0392b',
  blue: '#3498db',
  blue2: '#2980b9',
  gold: '#f1c40f',
  gold2: '#E87E04',
};

export const getPersonalityColor = (type) => {
  switch (type) {
    case 'SJ':
    case 'ESTJ':
    case 'ISTJ':
    case 'ESFJ':
    case 'ISFJ':
      return personalityColor.gold;
    case 'SP':
    case 'ESTP':
    case 'ISTP':
    case 'ESFP':
    case 'ISFP':
      return personalityColor.red;
    case 'NT':
    case 'ENTJ':
    case 'INTJ':
    case 'ENTP':
    case 'INTP':
      return personalityColor.blue;
    case 'NF':
    case 'ENFJ':
    case 'INFJ':
    case 'ENFP':
    case 'INFP':
      return personalityColor.green;
    default:
      return null;
  }
};
