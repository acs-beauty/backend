import styles from './App.module.scss';
import Header from './pages/Structure/Header/Header'
import Sidebar from './pages/Structure/Sidebar/Sidebar'
import Content from './pages/Structure/Content/Content'
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.appWrap}>
        <Header/>
        <Sidebar/>
        <Content/>
      </div>
    </BrowserRouter>
  );
}

export default App;
