import React from 'react';
import './style.scss';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css/bundle';
import useBanner from '../../hooks/useBanner';
import useMovieList from '../../hooks/useMovieList';
import CinemaInfo from './components/CinemaInfo/CinemaInfo';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const banner = useBanner();
  const movieList = useMovieList();

  const renderBanner = () => {
    return banner.map((element) => {
      const { maBanner, hinhAnh } = element;

      return (
        <SwiperSlide key={maBanner}>
          <img
            className="w-100"
            src={hinhAnh}
            alt=""
            style={{ height: '760px', objectFit: 'cover' }}
          />
        </SwiperSlide>
      );
    });
  };

  const renderMovieList = (data) => {
    return data.map((element) => {
      const { maPhim, hinhAnh, tenPhim, biDanh } = element;

      return (
        <div key={maPhim} className="col-3">
          <div
            className="card movie-card"
            style={{ marginBottom: 10, height: 450 }}
          >
            <div className="movie-img">
              <img
                style={{ height: 350, objectFit: 'cover' }}
                className="card-img-top"
                src={hinhAnh}
                alt={biDanh}
              />
              <div className="overlay-card">
                <button
                  onClick={() => navigate(`/movie-detail/${maPhim}`)}
                  className=" actions-btn btn cine-btn"
                >
                  Detail
                </button>
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title">{tenPhim}</h5>
            </div>
          </div>
        </div>
      );
    });
  };

  const nowShowingnMovieList = movieList.filter((element) => element.dangChieu);
  const comingSoonMovieList = movieList.filter((element) => {
    if (element.sapChieu && element.dangChieu === false) {
      return element;
    }
  });

  return (
    <div className="main pb-3">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        rewind={true}
        navigation={true}
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
      >
        {renderBanner()}
      </Swiper>

      <div className="py-4">
        <div className="container">
          <ul className="nav nav-pills movie-nav-pills justify-content-around">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="pill"
                href="#nowShowing"
              >
                Now Showing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="pill" href="#comingSoon">
                Coming Soon
              </a>
            </li>
          </ul>

          <div className="tab-content">
            <div className="tab-pane active" id="nowShowing">
              <div className="row mt-3 mx-auto ">
                {renderMovieList(nowShowingnMovieList)}
              </div>
            </div>
            <div className="tab-pane fade" id="comingSoon">
              <div className="row mt-3 mx-auto w-100">
                {renderMovieList(comingSoonMovieList)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">{/* <CinemaInfo /> */}</div>
    </div>
  );
}
