import React, { useEffect } from 'react';
import { Box, Button, ModalUnstyled, Rating, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { State } from '../redux/reducers/root-reducer';
import { Details, Genre } from '../types';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HistoryIcon from '@mui/icons-material/History';
import StarIcon from '@mui/icons-material/Star';
import getMovie from '../redux/actions/movie.actions';
import BackButton from '../components/BackButton';
import '../styles/MoviePage.scss';
import Spinner from '../components/Spinner';

const MoviePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movieId = String(id);

  useEffect(() => {
    dispatch(getMovie(movieId));
  }, [dispatch, movieId]);

  const base_url_for_backdrop = 'https://image.tmdb.org/t/p/w500';
  const base_url_for_poster = 'https://image.tmdb.org/t/p/w185';

  const { movie, fetched }: { movie: Details; fetched: boolean } = useSelector(
    (state: State) => state.movie
  );

  const {
    title,
    backdrop_path,
    poster_path,
    tagline,
    overview,
    genres,
    release_date,
    runtime,
  } = movie;

  return (
    <Box className='movie-page'>
      <div style={{ maxHeight: 'fit-content' }}>
        {fetched && (
          <Box
            className='container'
            sx={{
              backgroundImage: `url(${
                backdrop_path !== null
                  ? base_url_for_backdrop + backdrop_path
                  : poster_path !== null
                  ? base_url_for_poster + poster_path
                  : 'https://harriesopticians.com/wp-content/uploads/sites/30/2018/07/placeholder-coming-soon.jpg'
              })`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPositionY: '40%',
            }}
          >
            <Box
              className='inside-box'
              sx={{
                position: 'fixed',
                top: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              <div className='group'>
                <div
                  className='title_and_rating'
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <h2>{movie.title} </h2>
                  <Stack spacing={1}>
                    <Rating
                      value={movie.vote_average * 0.5}
                      precision={0.1}
                      max={5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 1, color: '#fff' }}
                          fontSize='inherit'
                        />
                      }
                      readOnly
                    />
                  </Stack>
                </div>
                <div className='img-and-inf'>
                  <div className='image'>
                    <img
                      src={
                        poster_path !== null
                          ? base_url_for_poster + poster_path
                          : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAETCAMAAABDSmfhAAAAP1BMVEXo6Ojp6enn5+fd3d2ZmZmUlJTi4uKbm5u4uLjPz8+Tk5Pt7e2zs7O8vLzW1tbMzMympqbFxcWhoaHBwcGqqqpGcOzZAAAEkElEQVR4nO2di5LiIBBFIS+N5KGZ/P+3Lg15kJhY67h7wap7pmaMktocWeimMTWjuvwb6VSuv5Hceqvvg95Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiN5VPvLGB9tnn59MW43moW0POD/Vr/ST03BM3zG/zguv+iv3X27i89rJSO39+6Hi9vMoy5tv9RUb3NT1m8TXnpdNxxonPRLoXZ6ZigVR4HHbe/tevu5to017t7B3d7eMB1cNbjfGIpIyWmd2MdeiPo0R625oTqblsf/rgpi7JOwLvyceVRFrdO7+O0j5WZaW2rm46Z6W9JeBeVHM3ek6z/mrKNnCjelWtNwVs5bx309y5Dqulb+/52h8l4q0PvxTkLxkla/S2HEsmdt8rU8wrF97eRoWMeaXiX10pkOxvqJu+DqSnecmKVqVxCS1xv5fq7GO6WSzF5B/NxmqJTfwcnxu5vF09WFu9wWroH771m+gTGyc47sA4ek/R2qzzvbbZhMNv0d3mZz0xhfJetluydz/NylV3V/bxsMpfyx+jeQd6x4S2M32onn1j81q/yzhRaVLre4frkoCqe1ye5i+4JeKuz/t4GlWxZn8hLKaxPFm/bjYu3WrWXYW6C9WAd3dvHk14vYaJVR0WDnuqGH3diFr9u8Hn+0lwto0so4/WYu2tdTkxinPx9XbwcWu8PLvuP5uUvSKi/y1fdvWmN7+3n5ZhXll7WHUNXHfOQ1rtrrYfo3j7P50a2L12k643b1dTTT7eLqbU8lSDSGTmUwiiF/n6Z59Uu72Sp5R31lOeV91Zr3tnk+Q8u+5/WVUEdv7yJFNdVPqFvvddx4vtbp+Xt4olMN21k5s31jnpaFbq6obYp36b6Nvq89PFkeHR1V1+DOk1te33yLoZeTmzjx+8579ws5a6+3EYUXxcvJ8b2Pqjnn5n3Y9PN83tvtdlHTifPz+O77vv6Wk77J2q/j6zmfYjLo7e0lzS8JZ5IoGiO9pHnQxdPegk8Opl48iLPL5Elsbxz7H1Q0ie2PjnyPvx4PrF8ebo+8aF7G08S8nbzMnc3Exg/81RwM8F6HWX8+lueyIZFbG+/XenqnXqtaA5w1dCYTL2j65tkE5d8ivVn8fShfdDq8k4V9XNue/HhF/cVyOfKke8/0flwO63hz7g16/02kbwzrer2ZI/qjLYzvoaL6W1LGbP5U6Dm4GjfnEX2fq5rdmuTV80xvSNBbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8sX+39jeSqe/evbiZB9wdLkUgm3FJ9/AAAAABJRU5ErkJggg==`
                      }
                      alt={title}
                    />
                  </div>

                  <div className='info'>
                    <h3 className='tagline'>{tagline}</h3>
                    <div className='about'>{overview}</div>
                  </div>
                </div>
                <div className='details'>
                  <div className='genres'>
                    {genres && <strong className='strong'>Genre: </strong>}
                    {genres.map((gen: Genre) => {
                      return (
                        <Button className='genre' key={gen.id}>
                          {gen.name}
                        </Button>
                      );
                    })}
                  </div>
                  <div className='other-info'>
                    {release_date && (
                      <div className='duration'>
                        <AccessTimeIcon />
                        <strong className='strong'>Released: </strong>
                        <div className='release_and_duration'>
                          {` ${release_date}`}
                        </div>
                      </div>
                    )}
                    {runtime && (
                      <div className='duration'>
                        <HistoryIcon />
                        <strong className='strong'>Duration: </strong>
                        <div className='release_and_duration'>
                          {runtime} minutes
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <BackButton />
            </Box>
          </Box>
        )}
      </div>
    </Box>
  );
};

const mapStateToProps = (state: State) => ({
  movie: state.movie.movie,
  fetched: state.movie.fetched,
});

export default connect(mapStateToProps)(MoviePage);
