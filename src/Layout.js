import "./App.css";
import Header from './components/Group/Header/Header';
import styles from './Layout.css';
// import Layout from './components/Group/Layout/Layout';

const Layout = (props) => {
   const { className, children } = props;
  return ( 
    // <div className='background'>
    <div>
      <Header/>
      <div className={styles.main_container}>{children}</div>
    </div>
  );
}

export default Layout;
