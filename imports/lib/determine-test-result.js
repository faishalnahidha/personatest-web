export const determineTestResult = answers => {
  if (Array.isArray(answers) === false) {
    return false;
  }

  let extrovert = 0,
    introvert = 0,
    sensory = 0,
    intuitive = 0,
    thinking = 0,
    feeling = 0,
    judging = 0,
    perceiving = 0;

  /**
   * Menghitung banyaknya masing" jawaban
   */
  for (let i = 0; i <= answers.length; i++) {
    if (answers[i] === 'E') {
      extrovert++;
    } else if (answers[i] === 'I') {
      introvert++;
    } else if (answers[i] === 'S') {
      sensory++;
    } else if (answers[i] === 'N') {
      intuitive++;
    } else if (answers[i] === 'T') {
      thinking++;
    } else if (answers[i] === 'F') {
      feeling++;
    } else if (answers[i] === 'J') {
      judging++;
    } else if (answers[i] === 'P') {
      perceiving++;
    }
  }

  /**
   * Menyimpan jawaban di atas ke dalam
   * obyek result dalam bentuk persen %
   */
  let result = {
    extrovert: Math.round(extrovert / 10 * 100),
    introvert: Math.round(introvert / 10 * 100),
    sensory: Math.round(sensory / 20 * 100),
    intuitive: Math.round(intuitive / 20 * 100),
    thinking: Math.round(thinking / 20 * 100),
    feeling: Math.round(feeling / 20 * 100),
    judging: Math.round(judging / 20 * 100),
    perceiving: Math.round(perceiving / 20 * 100)
  };

  /**
   * Menentukan tipe kepribadian (hurufnya) dari hasil
   * perhitungan di atas
   */
  let arrayType = Array(4);

  if (result.extrovert >= result.introvert) {
    arrayType[0] = 'E';
  } else {
    arrayType[0] = 'I';
  }

  if (result.sensory >= result.intuitive) {
    arrayType[1] = 'S';
  } else {
    arrayType[1] = 'N';
  }

  if (result.thinking >= result.feeling) {
    arrayType[2] = 'T';
  } else {
    arrayType[2] = 'F';
  }

  if (result.judging >= result.perceiving) {
    arrayType[3] = 'J';
  } else {
    arrayType[3] = 'P';
  }

  /**
   * Menentukan tipe kepribadian alternatif dari hasil
   * perhitungan di sebelum ini
   */
  let attributeCountDiff = Array(4);
  attributeCountDiff[0] = Math.abs(result.extrovert - result.introvert);
  attributeCountDiff[1] = Math.abs(result.sensory - result.intuitive);
  attributeCountDiff[2] = Math.abs(result.thinking - result.feeling);
  attributeCountDiff[3] = Math.abs(result.judging - result.perceiving);
  console.log('attributeDiff: ' + attributeCountDiff);

  /* a adalah index di array attributeCountDiff yang mempunyai nilai terkecil */
  const a = attributeCountDiff.indexOf(Math.min(...attributeCountDiff));

  /**
   * dua baris code di bawah untuk mencari index di array attributeCountDiff
   * yang mempunyai nilai terkecil kedua
   */
  const attributeCountDiff2 = attributeCountDiff.slice();
  attributeCountDiff2.splice(a, 1);
  const b = attributeCountDiff.indexOf(Math.min(...attributeCountDiff2));
  console.log('attributeDiff2: ' + attributeCountDiff2);

  /**
   * 4 baris code di bawah ini untuk menentukan dua tipe kepribadian alternatif
   * dengan menukar atribut arrayType (jika E maka ditukar ke I, dst) berdasarkan selisih
   * terkecil dari hasil perhitungan di atas sebelumnya.
   */
  const arrayTypeAlternative1 = arrayType.slice();
  const arrayTypeAlternative2 = arrayType.slice();
  arrayTypeAlternative1[a] = swapAttribute(arrayTypeAlternative1[a]);
  arrayTypeAlternative2[b] = swapAttribute(arrayTypeAlternative1[b]);

  /**
   * Mengkonversi tipe kepribadian dari array ke string dan disimpan di
   * obyek result
   */
  result.type = arrayType.join('');
  result.alternativeType1 = arrayTypeAlternative1.join('');
  result.alternativeType2 = arrayTypeAlternative2.join('');

  return result;
};

function swapAttribute(attribute) {
  if (attribute === 'E') {
    attribute = 'I';
  } else if (attribute === 'I') {
    attribute = 'E';
  } else if (attribute === 'S') {
    attribute = 'N';
  } else if (attribute === 'N') {
    attribute = 'S';
  } else if (attribute === 'T') {
    attribute = 'F';
  } else if (attribute === 'F') {
    attribute = 'T';
  } else if (attribute === 'J') {
    attribute = 'P';
  } else if (attribute === 'P') {
    attribute = 'J';
  }

  return attribute;
}
