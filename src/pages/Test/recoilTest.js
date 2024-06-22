
import { useRecoilValue } from "recoil";
import { MentorListAtom } from '../../recoil/atoms/testAtom';
import { TotalMentorSelector } from '../../recoil/selectors/testSelector';

const RecoilTest = ({ data }) => {
    // const [cartItem, setCartItem] = useRecoilState(CartAtom); // 상태 값 + 변경 모두 필요할 떄

    // const setCartItem = useSetRecoilState(RecoilTest); // 상배 변경할 때
    // const { id, title, description, price } = data;

    // const removeFromCart = () => {
    //     setCartItem((prev) => prev.filter((e) => e.id !== id));
    // };

    const mentorList = useRecoilValue(MentorListAtom); // 상태 값만 사용
    const TotalMentor = useRecoilValue(TotalMentorSelector); // 상태 값만 사용

  return (
      <>
          {
              mentorList.length ? (
                  mentorList.map((mento) => <p>{mentor.name}</p>)
              ) : (
                    <h1>멘토 없음</h1>
              )
          }
          <h2>{TotalMentor}</h2>
    </>
  );
}

export default RecoilTest;
