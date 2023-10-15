import React, { useEffect, useState } from 'react';
import { cinemaService } from '../services/cinema';

export default function useCinemaInfo() {
  const [cinemaInfo, setCinemaInfo] = useState([]);

  const fetchCinemaInfo = async () => {
    const result = await cinemaService.fetchCinemaInfoApi();

    setCinemaInfo(result.data.content);
  };

  useEffect(() => {
    fetchCinemaInfo();
  }, []);

  return cinemaInfo;
}
