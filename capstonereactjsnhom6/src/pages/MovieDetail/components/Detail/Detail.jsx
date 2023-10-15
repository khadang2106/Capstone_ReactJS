import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../../../../services/movie';
import { formatDate } from '../../../../utils/date';
import ReactPlayer from 'react-player';

export default function Detail() {
  const params = useParams();

  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  const fetchMovieDetail = async () => {
    const result = await movieService.fetMovieDetailApi(params.movieId);

    setMovieDetail(result.data.content);
  };

  const { tenPhim, hinhAnh, moTa, ngayKhoiChieu, trailer, biDanh } =
    movieDetail;

  return (
    <div className="row">
      <h2 className="col-12 mb-4">Movie Detail</h2>

      <div className="col-3">
        <img
          style={{ height: 300, objectFit: 'cover' }}
          className="img-fluid"
          src={hinhAnh}
          alt={biDanh}
        />
      </div>
      <div className="col-9 movie-detail-text">
        <h4 className="movie-name">{tenPhim}</h4>

        <p>
          Release date:{' '}
          <span style={{ fontStyle: 'italic' }}>
            {formatDate(ngayKhoiChieu)}
          </span>
        </p>
        <ul className="nav nav-pills mb-3 w-50 mx-auto">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-toggle="pill"
              href="#movieContent"
            >
              Movie Content
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="pill" href="#trailer">
              Trailer
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane container active" id="movieContent">
            <p>{moTa}</p>
          </div>
          <div className="tab-pane container fade" id="trailer">
            <ReactPlayer
              url={trailer}
              controls={true}
              width="480px"
              height="240px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
