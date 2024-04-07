import "./App.css"
import Header from './components/Group/Header/Header';
import Matching_Mentee from './pages/Matching/Matching_Mentee';
import Matching_Mentor from './pages/Matching/Matching_Mentor';
import Body from './components/Group/Body/Body';

function App() {
  return ( 
    <div className='background'>
      <Header/>
      <div style={{paddingBottom:'200px'}}></div>
      <Body sentence1="보다 쉬운 코딩 과외 매칭을 위해" sentence2="DevTogether에서 더 나은 매칭 선택" title="학생 찾기 / 선생님 찾기"/>
      <Matching_Mentee/>
    </div>
  );
}

export default App;
