import './App.css';

function App() {
  return (
    <div className="App background">
      <div className='display-header'>
        <header className='element2'>
          DevTogether
        </header>
        <div className='display-menu element3'>  
          <span>내 정보</span>
          <span>학생 찾기 / 선생님 찾기</span>
          <span>자유게시판</span>
          <span>공지사항</span>
          <span>자주묻는질문</span>
        </div>
        <div className="element">
          <img src='./bell.png' alt='알림' className='img' style={{marginLeft:'40px'}}></img>
          <img src='./user.png' alt='마이페이지' className='img2' style={{marginLeft:'20px', marginRight:'20px'}}></img>
        </div>
      </div>
      <div style={{paddingBottom:'200px'}}></div>
      <div className='display-body'>
        <div className='element4 display-body6 display-row'>
          <div>
            <div className='display-body7'>
              <div>보다 쉬운 코딩 과외 매칭을 위해</div>
              <div><span style={{color:'black'}}>DevTogether</span>에서 더 나은 매칭 선택</div>  
            </div>
            <div className='display-body8'>학생 찾기 / 선생님 찾기</div>
          </div>
          <img src="./support.png" className='display-body9'></img>
        </div>
        <div className='horizontal-line'></div>
        <div className='display-row'>
          <div className='background2 '> 
             <div className='display-body3' style={{marginTop:'100px'}}>학생 목록보기</div>
             <div className='display-body3' style={{marginTop:'50px'}}>선생님 목록보기</div> 
          </div>
          <div style={{marginTop:'50px', marginLeft:'150px'}}>
            <div className='display-row'>
              <div className='element5'>학생 목록</div>
              <div className='display-body2'>닉네임으로 검색</div>
            </div>
            <div className='display-row' style={{marginTop:'50px', justifyContent:'space-between'}}>
                <div className='display-body5'>과목</div>
                <div className='display-body5'>지역</div>
                <div className='display-body5'>성별</div>
                <div className='display-body5'>나이</div>
                <div className='display-body5'>과외방식</div>
                <div className='display-body5'>수업료</div>
            </div>
            <div className='display-row'> 
              <div className='display-body4'></div>
              <div className='display-body4'></div>
              <div className='display-body4'></div>
              <div className='display-body4'></div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default App;
