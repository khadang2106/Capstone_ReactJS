import React, { useEffect, useState } from 'react';
import { bannerService } from '../services/banner';

export default function useBanner() {
  const [banner, setBanner] = useState([]);

  const fetchBanner = async () => {
    const result = await bannerService.fetchBannerApi();

    setBanner(result.data.content);
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return banner;
}
