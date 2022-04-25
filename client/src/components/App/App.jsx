import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import Error404 from '../Error404/Error404';
import Header from '../Header/Header';
import Registration from '../Registration/Registration';
import Main from '../Main/Main';
import AnswerForm from '../AnswerForm/AnswerForm';
import Login from '../Login/Login';
import Logout from "../Logout/Logout";



function App() {
  



  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/main/:id_theme/:id_answer" element={<AnswerForm />} />
          <Route path="*" element={<Error404 />} />
        </Routes>

      </BrowserRouter>
    </Provider>
  );
}

export default App;
