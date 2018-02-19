const PRIVATE_CONTENTS_COUNT = 5;
const PUBLIC_CONTENTS_COUNT = 24;
const OVERALL_COUNT = 33;

export const privateContentPercentage = (contentReadFlags) => {
  let privateContentReadCount = 0;
  contentReadFlags.private.forEach((element) => {
    privateContentReadCount += element.flag ? 1 : 0;
  });

  return Math.floor(privateContentReadCount / PRIVATE_CONTENTS_COUNT * 100);
};

export const publicContentPercentage = (contentReadFlags) => {
  let publicContentReadCount = 0;
  // contentReadFlags.private.forEach((element) => {
  //   publicContentReadCount += element.flag ? 1 : 0;
  // });

  contentReadFlags.public.forEach((element) => {
    publicContentReadCount += element.flag ? 1 : 0;
  });

  return Math.floor(publicContentReadCount / PUBLIC_CONTENTS_COUNT * 100);
};

export const overallContentPercentage = (contentReadFlags) => {
  let overallCount = 3; // initial count because test was finished
  contentReadFlags.private.forEach((element) => {
    overallCount += element.flag ? 1 : 0;
  });

  contentReadFlags.public.forEach((element) => {
    overallCount += element.flag ? 1 : 0;
  });

  return Math.floor(overallCount / OVERALL_COUNT * 100);
};
