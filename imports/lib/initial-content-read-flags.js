export const initialPublicContentReadFlags = [
  {
    contentId: 'mengenali-diri-sendiri',
    flag: false,
  },
  {
    contentId: 'pengelompokan-kepribadian',
    flag: false,
  },
  {
    contentId: 'pengelompokan-myers-briggs',
    flag: false,
  },
  {
    contentId: 'kunjungan-ke-perusahaan',
    flag: false,
  },
  {
    contentId: 'gold',
    flag: false,
  },
  {
    contentId: 'red',
    flag: false,
  },
  {
    contentId: 'blue',
    flag: false,
  },
  {
    contentId: 'green',
    flag: false,
  },
  {
    contentId: 'estj',
    flag: false,
  },
  {
    contentId: 'istj',
    flag: false,
  },
  {
    contentId: 'esfj',
    flag: false,
  },
  {
    contentId: 'isfj',
    flag: false,
  },
  {
    contentId: 'estp',
    flag: false,
  },
  {
    contentId: 'istp',
    flag: false,
  },
  {
    contentId: 'esfp',
    flag: false,
  },
  {
    contentId: 'isfp',
    flag: false,
  },
  {
    contentId: 'entj',
    flag: false,
  },
  {
    contentId: 'intj',
    flag: false,
  },
  {
    contentId: 'entp',
    flag: false,
  },
  {
    contentId: 'intp',
    flag: false,
  },
  {
    contentId: 'enfj',
    flag: false,
  },
  {
    contentId: 'infj',
    flag: false,
  },
  {
    contentId: 'enfp',
    flag: false,
  },
  {
    contentId: 'infp',
    flag: false,
  },
];

export const initialPrivateContentReadFlags = (personalityId) => {
  const pid = personalityId.toLowerCase();

  const readFlags = [
    {
      contentId: `${pid}/kelebihan-alami`,
      flag: false,
    },
    {
      contentId: `${pid}/lingkungan-kerja-ideal`,
      flag: false,
    },
    {
      contentId: `${pid}/karir-yang-menarik`,
      flag: false,
    },
    {
      contentId: `${pid}/bos-ideal`,
      flag: false,
    },
    {
      contentId: `${pid}/tantangan-kepribadian`,
      flag: false,
    },
  ];

  return readFlags;
};
