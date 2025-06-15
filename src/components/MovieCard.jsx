import React from "react";

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <div className="movie-card">
      <div>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "./no-movie.png"
          }
          alt="No Movie Poster"
        />
      </div>
      <div className="text-white mt-3.5 mr-3.5 mb-4 font-bold">{title}</div>
      <div className="content font-bold">
        <div className="rating text-white font-bold">
          <img className="size-5" src="./star.svg" alt="Star Image" />
          {vote_average ? vote_average.toFixed(1) : "N/A"}
        </div>
        <span>•</span>
        <p className="lang  text-white font-bold">{original_language}</p>
        <span>•</span>
        <p className="year  text-white font-bold">
          {release_date ? release_date.split("-")[0] : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
