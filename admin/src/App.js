import styles from './App.module.scss';
import Header from './components/Structure/Header/Header'
import Sidebar from './components/Structure/Sidebar/Sidebar'
import Content from './components/Structure/Content/Content'
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
