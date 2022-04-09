import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import HomePage from './pages/home/HomePage';
import { Routes, Route } from "react-router-dom";
import MoviePage from './pages/movie/MoviePage';
import NotFoundPage from './pages/not_found/NotFoundPage';
import MoviesPage from './pages/movies/MoviesPage';
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import { useEffect } from 'react';
import { filmCriticApi } from './services/filmCritic';
import { setUser } from './features/user/userSlice';
import { useDispatch } from 'react-redux';
import ProfilePage from './pages/profile_page/ProfilePage';

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = filmCriticApi.useMeQuery();
  
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data])

  return (
    <div className="App">
      <Navbar />
      <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="show/:id" element={<MoviePage show />} />
          <Route path="shows" element={<MoviesPage show />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path='profile/:username' element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
