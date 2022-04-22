import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import Theaters from './pages/Theaters';
import Upcoming from './pages/Upcoming';
import BoxOffice from './pages/BoxOffice';
import MoviePage from './pages/MoviePage';
import TvShowPage from './pages/TvShowPage';
import '../src/styles/App.scss';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Movies />}>
          <Route path='/movies/movie/:id' element={<MoviePage />} />
        </Route>
        <Route path='/tv_shows' element={<TvShows />}>
          <Route path='/tv_shows/tv_show/:id' element={<TvShowPage />} />
        </Route>
        <Route path='/in_theaters' element={<Theaters />}>
          <Route path='movie/:id' element={<MoviePage />} />
        </Route>
        <Route path='/upcoming' element={<Upcoming />}>
          <Route path='movie/:id' element={<MoviePage />} />
        </Route>
        <Route path='/box_office' element={<BoxOffice />}>
          <Route path='movie/:id' element={<MoviePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
