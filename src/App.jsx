import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import Loader from "./components/Loader";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/JSON",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [movieList, setMovieList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(false);
    setErrorMessage("");
    try {
      const endPoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endPoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("FAILED TO FETCH MOVIES!");
      }

      const data = await response.json();

      console.log(data);

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies : ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error Fetching Trending movies : ${error}`);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <>
      <div className="pattern">
        <div className="wrapper">
          <header className="mt-0">
            <h1>
              <img src="./hero.png" alt="Hero Banner" />
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              Without Worry.
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          {trendingMovies && (
            <section className="trending">
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((mov, index) => (
                  <li key={mov.$id}>
                    <p>{index + 1}</p>
                    <img src={mov.poster_url} alt={mov.title} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="all-movies">
            <p className="flex mt-10.5 justify-self-center text-8xl text-shadow-2xs bg-clip-text text-transparent bg-gradient-to-r drop-shadow-[5px_6px_4px_rgba(120,30,30,0.8)] from-red-500 via-blue-500 to-fuchsia-200">
              All - Movies
            </p>
            {isLoading ? (
              <p className="text-white text-2xl flex justify-self-center p-3.5">
                <div>
                  <Loader />
                </div>
                <div className="m-auto">Loading....</div>
              </p>
            ) : errorMessage ? (
              <p className="text-red-400">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default App;
