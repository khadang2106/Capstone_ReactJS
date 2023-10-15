import React, { useEffect, useState } from 'react';
import { cinemaService } from '../services/cinema';

export default function useCinemaShowtime() {
  const [cinemaShowtime, setCinemaShowtime] = useState([]);

  const fetchCinemaShowtime = async () => {
    const result = await cinemaService.fetchCinemaShowtimesApi('CGV');

    console.log(result);

    setCinemaShowtime(result.data.content);
  };

  useEffect(() => {
    fetchCinemaShowtime();
  }, []);

  return cinemaShowtime;
}
