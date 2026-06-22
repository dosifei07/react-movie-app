import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails, clearCurrentMovie } from '../features/movies/moviesSlice';

const MovieDetails = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  
  const { currentMovie, isLoading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getMovieDetails(id));

    return () => {
      dispatch(clearCurrentMovie());
    };
  }, [dispatch, id]);

  if (isLoading) return <h2 style={{ color: '#e50914', padding: '20px' }}>Loading...</h2>;
  if (error) return <h2 style={{ color: 'red', padding: '20px' }}>Error: {error}</h2>;
  if (!currentMovie) return null;

  const similarMovies = currentMovie.similar?.results?.slice(0, 5) || [];

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#fff', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{
        position: 'relative',
        height: '450px',
        backgroundImage: `linear-gradient(to bottom, rgba(20,20,20,0) 50%, rgba(20,20,20,1) 100%), url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', background: '#e50914', color: '#fff', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
          Return
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginBottom: '5px' }}>
        
        <div style={{ flex: '1', minWidth: '250px', maxWidth: '300px' }}>
          {currentMovie.poster_path ? (
            <img 
              src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`} 
              alt={currentMovie.title} 
              style={{ width: '100%', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
            />
          ) : (
            <div style={{ width: '100%', height: '450px', background: '#333', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Немає постера</div>
          )}
        </div>

        <div style={{ flex: '2', minWidth: '300px' }}>
          <h1 style={{ fontSize: '42px', margin: '0 0 10px 0' }}>{currentMovie.title || currentMovie.name}</h1>
          
          {currentMovie.tagline && (
            <p style={{ fontStyle: 'italic', color: '#aaa', fontSize: '18px', margin: '0 0 20px 0' }}>
              "{currentMovie.tagline}"
            </p>
          )}

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
            <span style={{ color: '#46d369', fontWeight: 'bold', fontSize: '18px' }}>
              Rating: {currentMovie.vote_average ? currentMovie.vote_average.toFixed(1) : '0.0'}
            </span>
            <span style={{ color: '#aaa' }}>
              Year: {currentMovie.release_date ? currentMovie.release_date.split('-')[0] : '----'}
            </span>
            {currentMovie.runtime && (
              <span style={{ color: '#aaa' }}>
                Duration: {currentMovie.runtime} m.
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '25px' }}>
            {currentMovie.genres?.map(genre => (
              <span key={genre.id} style={{ background: '#333', padding: '5px 12px', borderRadius: '20px', fontSize: '14px' }}>
                {genre.name}
              </span>
            ))}
          </div>

          <div>
            <h2 style={{ fontSize: '22px', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px' }}>
              Film overview
            </h2>
            <p style={{ lineHeight: '1.6', color: '#ddd', fontSize: '16px' }}>
              {currentMovie.overview || "No description"}
            </p>
          </div>
        </div>
      </div>

      {similarMovies.length > 0 && (
        <div style={{ marginTop: '50px', paddingBottom: '40px' }}>
          <h2 style={{ fontSize: '26px', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
            Similar films
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
            {similarMovies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: '#2f2f2f', padding: '12px', borderRadius: '8px', textAlign: 'center', transition: 'transform 0.2s' }}>
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Poster'}
                    alt={movie.title}
                    style={{ width: '100%', borderRadius: '4px', marginBottom: '8px' }}
                  />
                  <h4 style={{ fontSize: '14px', margin: '5px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {movie.title || movie.name}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default MovieDetails;