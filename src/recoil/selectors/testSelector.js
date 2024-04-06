import { selector } from "recoil";
import { MentoListAtom } from '../atoms/testAtom';

export const TotalMentoSelector = selector({
  key: "TotalMentoSelector",
  get: ({ get }) => {
    const TotalMento = get(MentoListAtom);
    return TotalMento.length;
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