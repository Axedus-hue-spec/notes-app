import type { FC } from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from './page/HomePage';
import RegisterPage from './page/RegisterPage';
import LoginPage from './page/LoginPage';

const App: FC = () => {

  return (
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/registration' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />}/>
    </Routes>
  )
}

export default App
