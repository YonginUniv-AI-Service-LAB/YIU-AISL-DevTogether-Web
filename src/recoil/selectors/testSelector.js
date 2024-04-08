import { selector } from "recoil";
import { MentorListAtom } from '../atoms/testAtom';

export const TotalMentorSelector = selector({
  key: "TotalMentorSelector",
  get: ({ get }) => {
    const TotalMentor = get(MentorListAtom);
    return TotalMentor.length;
  },
});

// export const TotalPriceSelector = selector({
//   key: "TotlaPriceSelector",
//   get: ({ get }) => {
//     const CurrentItem = get(CartAtom);
//     return CurrentItem.reduce(
//       (acc, cur) => acc + cur.price,
//       0
//     ).toLocaleString();
//   },
// });