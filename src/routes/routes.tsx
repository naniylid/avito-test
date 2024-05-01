import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Film from '../pages/Film/Film';
import RandomFilm from '../pages/RandomFilm/RandomFilm';
import MainLayout from '../layout/MainLayout';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/movie/:id' element={<Film />} />
        <Route path='/random' element={<RandomFilm />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
