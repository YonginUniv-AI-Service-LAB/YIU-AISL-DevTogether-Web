import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import Layout from "./Layout";
import ChangePwdPage from './pages/ChangePwd/ChangePwd';
import MainPage from './pages/Main/Main';
import PushListPage from './pages/PushList/PushList';
import SignInPage from './pages/SignIn/SignIn';
import SignUpPage from './pages/SignUp/SignUp';

import MatchingPage from './pages/Matching/Matching';
import MenteeDetailPage from './pages/MatchingDetail/MenteeDetail';
import MentorDetailPage from './pages/MatchingDetail/MentorDetail';
import MatchingManagementListPage from './pages/MatchingManagementList/MatchingManagementList';

import UserPage from './pages/User/User';
import CommentListPage from './pages/UserBoard/CommentList';
import PostListPage from './pages/UserBoard/PostList';
import ScrapListPage from './pages/UserBoard/ScrapList';

import BoardPage from './pages/Board/Board';
import FAQFormPage from './pages/FAQForm/FAQForm';
import FAQListPage from './pages/FAQList/FAQList';
import InquiryDetailPage from './pages/InquiryDetail/InquiryDetail';
import InquiryFormPage from './pages/InquiryForm/InquiryForm';
import InquiryListPage from './pages/InquiryList/InquiryList';
import MessagePage from './pages/Message/Message';
import NoticeDetailPage from './pages/NoticeDetail/NoticeDetail';
import NoticeFormPage from './pages/NoticeForm/NoticeForm';
import NoticeListPage from './pages/NoticeList/NoticeList';
import PostDetailPage from './pages/PostDetail/PostDetail';
import PostFormPage from './pages/PostForm/PostForm';
import ReportDetailPage from './pages/ReportDetail/ReportDetail';
import ReportListPage from './pages/ReportList/ReportList';

function App(props) {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path='/*' element={<MainPage />} />
          <Route exact path='/signup' element={<SignUpPage />} />
          <Route exact path='/signin' element={<SignInPage />} />
          <Route exact path='/changepwd' element={<ChangePwdPage />} />
          <Route exact path='/push' element={<PushListPage />} />
          
          <Route exact path='/user' element={<UserPage />} />
          <Route exact path='/user/manage/:target' element={<MatchingManagementListPage/>}/>
          <Route exact path='/user/post' element={<PostListPage />} />
          <Route exact path='/user/comment' element={<CommentListPage />} />
          <Route exact path='/user/scrap' element={<ScrapListPage/>}/>
          
          <Route exact path='/matching/:target' element={<MatchingPage />} />
          <Route exact path='/matching/mentor/:id' element={<MentorDetailPage />} />
          <Route exact path='/matching/mentee/:id' element={<MenteeDetailPage />} />
          
          <Route exact path='/board' element={<BoardPage />} />
          <Route exact path='/board/post/:id' element={<PostDetailPage />} />
          <Route exact path='/board/post/form' element={<PostFormPage />} />
          
          <Route exact path='/notice' element={<NoticeListPage />} />
          <Route exact path='/notice/:id' element={<NoticeDetailPage />} />
          <Route exact path='/notice/form' element={<NoticeFormPage />} />

          <Route exact path='/faq' element={<FAQListPage />} />
          <Route exact path='/faq/form' element={<FAQFormPage />} />
          
          <Route exact path='/report' element={<ReportListPage />} />
          <Route exact path='/report/:id' element={<ReportDetailPage />} />

          <Route exact path='/inquiry' element={<InquiryListPage/>} />
          <Route exact path='/inquiry/:id' element={<InquiryDetailPage />} />
          <Route exact path='/inquiry/form' element={<InquiryFormPage />} />

          <Route exact path='/message' element={<MessagePage/>} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;