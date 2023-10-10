import React from 'react'
import useMovieList from '../../hooks/useMovieList'

export default function MovieManagement() {
    const movieList = useMovieList();
    console.log(movieList);
  return (
    <div>MovieManagement</div>
  )
}
