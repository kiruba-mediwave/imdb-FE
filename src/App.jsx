import { useState, useEffect } from "react";
import AddMovieForm from "./Components/AddMovieForm";
import MovieList from "./Components/MovieList";
import "@picocss/pico";

function App() {
  const [movies, setMovies] = useState([]);
  const [updateStorage, setUpdateStorage] = useState(false);

  const handleDelete = (movieId) => {
    const newMovieList = movies.filter((m) => m.id !== movieId);
    setMovies(newMovieList);
  };

  const handleAdd = (movieInfo) => {
    const moviePayload = {
      ...movieInfo,
      id: new Date().getTime(),
    };
    setMovies((prev) => {
      const update = [...prev];
      update.push(moviePayload);
      return update;
    });
    setUpdateStorage(true);
  };

  useEffect(() => {
    const moviesFromStorage = localStorage.getItem("allMovies");
    const json = JSON.parse(moviesFromStorage);
    setMovies(json);
  }, []);

  useEffect(() => {
    if (updateStorage) {
      localStorage.setItem("allMovies", JSON.stringify(movies));
      setUpdateStorage(false);
    }
  }, [movies]);

  return (
    <div className="container">
      <AddMovieForm onMovieAdd={handleAdd} />
      <MovieList movies={movies} onMovieDelete={handleDelete} />
    </div>
  );
}

export default App;
