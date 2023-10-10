//đây là hook gọi danh sách phim
import { useEffect, useState } from 'react'
import { movieService } from '../services/movie';

export default function useMovieList() {
    const [movieList,setMovieList] = useState([]);
    const fetchMovieList = async () => {
        const result = await movieService.fetMovieListApi();
        setMovieList(result.data.content);
    }
    useEffect(()=>{
        fetchMovieList();
    },[])
  return movieList;
}
