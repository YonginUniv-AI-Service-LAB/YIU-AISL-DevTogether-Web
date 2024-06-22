import "./App.css";
import Header from "./components/Group/Header/Header";
import Footer from "./components/Group/Footer/Footer";
import styles from "./Layout.css";
// import Layout from './components/Group/Layout/Layout';

const Layout = (props) => {
  const { className, children } = props;
  return (
    // <div className='background'>
    <div className={styles.background}>
      <Header />
      <div style={{ minHeight: 1000 }}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
