export const getPersonalityName = (personalityId) => {
  switch (personalityId) {
    case 'SJ':
      return 'Gold';
    case 'ESTJ':
      return 'The Supervisor';
    case 'ISTJ':
      return 'The Inspector';
    case 'ESFJ':
      return 'The Provider';
    case 'ISFJ':
      return 'The Protector';
    case 'SP':
      return 'Red';
    case 'ESTP':
      return 'The Supervisor';
    case 'ISTP':
      return 'The Crafter';
    case 'ESFP':
      return 'The Performer';
    case 'ISFP':
      return 'The Composer';
    case 'NT':
      return 'Blue';
    case 'ENTJ':
      return 'The Commander';
    case 'INTJ':
      return 'The Mastermind';
    case 'ENTP':
      return 'The Inventor';
    case 'INTP':
      return 'The Thinker';
    case 'NF':
      return 'Green';
    case 'ENFJ':
      return 'The Mentor';
    case 'INFJ':
      return 'The Counselor';
    case 'ENFP':
      return 'The Champion';
    case 'INFP':
      return 'The Dreamer';
    default:
      return null;
  }
};

export const getPersonalityNameWithLetter = (personalityId) => {
  switch (personalityId) {
    case 'SJ':
      return 'Gold [SJ]';
    case 'ESTJ':
      return 'The Supervisor (ESTJ)';
    case 'ISTJ':
      return 'The Inspector (ISTJ)';
    case 'ESFJ':
      return 'The Provider (ESFP)';
    case 'ISFJ':
      return 'The Protector (ISFJ)';
    case 'SP':
      return 'Red [SP]';
    case 'ESTP':
      return 'The Supervisor (ESTP)';
    case 'ISTP':
      return 'The Crafter (ISTP)';
    case 'ESFP':
      return 'The Performer (ESFP)';
    case 'ISFP':
      return 'The Composer (ISFP)';
    case 'NT':
      return 'Blue [NT]';
    case 'ENTJ':
      return 'The Commander (ENTJ)';
    case 'INTJ':
      return 'The Mastermind (INTJ)';
    case 'ENTP':
      return 'The Inventor (ENTP)';
    case 'INTP':
      return 'The Thinker (INTP)';
    case 'NF':
      return 'Green [NF]';
    case 'ENFJ':
      return 'The Mentor (ENFJ)';
    case 'INFJ':
      return 'The Counselor (INFJ)';
    case 'ENFP':
      return 'The Champion (ENFP)';
    case 'INFP':
      return 'The Dreamer (INFP)';
    default:
      return null;
  }
};
