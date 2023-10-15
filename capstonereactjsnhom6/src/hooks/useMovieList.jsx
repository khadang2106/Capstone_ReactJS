//đây là hook gọi danh sách phim
import { useContext, useEffect, useState } from 'react';
import { movieService } from '../services/movie';
import { LoadingContext } from '../contexts/LoadingContext/LoadingContext';

export default function useMovieList() {
  const [loadingState, setLoadingState] = useContext(LoadingContext);
  const [movieList, setMovieList] = useState([]);

  const fetchMovieList = async () => {
    setLoadingState({
      isLoading: true,
    });

    const result = await movieService.fetMovieListApi();
    setMovieList(result.data.content);
    setLoadingState({
      isLoading: false,
    });
  };
  useEffect(() => {
    fetchMovieList();
  }, []);
  return movieList;
}
