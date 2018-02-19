function swapAttribute(attribute) {
  let swappedAttribute;

  if (attribute === 'E') {
    swappedAttribute = 'I';
  } else if (attribute === 'I') {
    swappedAttribute = 'E';
  } else if (attribute === 'S') {
    swappedAttribute = 'N';
  } else if (attribute === 'N') {
    swappedAttribute = 'S';
  } else if (attribute === 'T') {
    swappedAttribute = 'F';
  } else if (attribute === 'F') {
    swappedAttribute = 'T';
  } else if (attribute === 'J') {
    swappedAttribute = 'P';
  } else if (attribute === 'P') {
    swappedAttribute = 'J';
  }

  return swappedAttribute;
}

export function determineTestResult(answers) {
  if (Array.isArray(answers) === false) {
    return false;
  }

  let extrovert = 0;
  let introvert = 0;
  let sensory = 0;
  let intuitive = 0;
  let thinking = 0;
  let feeling = 0;
  let judging = 0;
  let perceiving = 0;

  /**
   * Menghitung banyaknya masing" jawaban
   */
  for (let i = 0; i <= answers.length; i += 1) {
    if (answers[i] === 'E') {
      extrovert += 1;
    } else if (answers[i] === 'I') {
      introvert += 1;
    } else if (answers[i] === 'S') {
      sensory += 1;
    } else if (answers[i] === 'N') {
      intuitive += 1;
    } else if (answers[i] === 'T') {
      thinking += 1;
    } else if (answers[i] === 'F') {
      feeling += 1;
    } else if (answers[i] === 'J') {
      judging += 1;
    } else if (answers[i] === 'P') {
      perceiving += 1;
    }
  }

  /**
   * Menyimpan jawaban di atas ke dalam
   * obyek result dalam bentuk persen %
   */
  const result = {
    extrovert: Math.round(extrovert / 10 * 100),
    introvert: Math.round(introvert / 10 * 100),
    sensory: Math.round(sensory / 20 * 100),
    intuitive: Math.round(intuitive / 20 * 100),
    thinking: Math.round(thinking / 20 * 100),
    feeling: Math.round(feeling / 20 * 100),
    judging: Math.round(judging / 20 * 100),
    perceiving: Math.round(perceiving / 20 * 100),
  };

  /**
   * Menentukan tipe kepribadian (hurufnya) dari hasil
   * perhitungan di atas
   */
  const arrayType = Array(4);

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
  const attributeCountDiff = Array(4);
  attributeCountDiff[0] = Math.abs(result.extrovert - result.introvert);
  attributeCountDiff[1] = Math.abs(result.sensory - result.intuitive);
  attributeCountDiff[2] = Math.abs(result.thinking - result.feeling);
  attributeCountDiff[3] = Math.abs(result.judging - result.perceiving);
  // console.log(`attributeDiff: ${attributeCountDiff}`);

  /* a adalah index di array attributeCountDiff yang mempunyai nilai terkecil */
  const a = attributeCountDiff.indexOf(Math.min(...attributeCountDiff));

  /**
   * dua baris code di bawah untuk mencari index di array attributeCountDiff
   * yang mempunyai nilai terkecil kedua
   */
  const attributeCountDiff2 = attributeCountDiff.slice();
  attributeCountDiff2[a] = 999;
  // console.log(`attributeDiff2: ${attributeCountDiff2}`);

  const b = attributeCountDiff2.indexOf(Math.min(...attributeCountDiff2));

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
}
