
import { useRecoilValue } from "recoil";
import { MentoListAtom } from '../../recoil/atoms/testAtom';
import { TotalMentoSelector } from '../../recoil/selectors/testSelector';

const RecoilTest = ({ data }) => {
    // const [cartItem, setCartItem] = useRecoilState(CartAtom); // 상태 값 + 변경 모두 필요할 떄

    // const setCartItem = useSetRecoilState(RecoilTest); // 상배 변경할 때
    // const { id, title, description, price } = data;

    // const removeFromCart = () => {
    //     setCartItem((prev) => prev.filter((e) => e.id !== id));
    // };

    const mentoList = useRecoilValue(MentoListAtom); // 상태 값만 사용
    const TotalMento = useRecoilValue(TotalMentoSelector); // 상태 값만 사용

  return (
      <>
          {
              mentoList.length ? (
                  mentoList.map((mento) => <p>{mento.name}</p>)
              ) : (
                    <h1>멘토 없음</h1>
              )
          }
          <h2>{TotalMento}</h2>
    </>
  );
}
// const ColumnWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 16px;
// `;

// const Heading = styled.span`
//   font-size: 20px;
//   font-weight: var(--bold);
// `;
// const ItemWrapper = styled.ul`
//   display: flex;
//   width: 100%;
//   height: 100%;
//   min-height: calc(100vh - 300px);
//   gap: 8px;
//   flex-direction: column;
// `;
// const TotalPriceWrapper = styled.div`
//   padding: 16px;
//   height: 150px;
//   width: 100%;
//   max-width: 1024px;
//   border: 1px solid var(--line-gray);
//   & span {
//     text-align: right;
//   }
// `;
// const NoItems = styled.div`
//   padding: 8px;
//   width: fit-content;
//   margin: 0 auto;
//   border-radius: 4px;
//   text-align: center;
//   border: 1px solid var(--line-gray);
// `;

export default RecoilTest;
