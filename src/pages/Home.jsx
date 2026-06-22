import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrending } from '../features/movies/moviesSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const { list, isLoading } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getTrending(1));
  }, [dispatch]);

  return (
    <div>
      <h1>This week's films</h1>
      
      {isLoading && <h2>isLoading</h2>}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '20px',
        marginTop: '20px'
      }}>
        {list.map((movie) => (
  <Link 
    to={`/movie/${movie.id}`} 
    key={movie.id} 
    style={{ textDecoration: 'none', color: 'inherit' }}
  >
    <div style={{ 
      background: '#2f2f2f', 
      padding: '15px', 
      textAlign: 'center',
      borderRadius: '8px',
    }}>
      <img 
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
        alt={movie.title} 
        style={{ width: '100%', marginBottom: '10px', borderRadius: '8px' }}
      />
      <h3>{movie.title}</h3>
      <span>{Number(movie.vote_average.toFixed(1)) || "No reviews"}</span>
    </div>
  </Link>
))}
      </div>
    </div>
  );
};

export default Home;