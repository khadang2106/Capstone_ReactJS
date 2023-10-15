import React from 'react';
import useCinemaInfo from '../../../../hooks/useCinemaInfo';
import useCinemaShowtime from '../../../../hooks/useCinemaShowtime';

export default function CinemaInfo() {
  const cinemaInfo = useCinemaInfo();
  console.log(cinemaInfo);
  const cinemeShowtime = useCinemaShowtime();
  console.log(cinemeShowtime);

  const renderCinemaLogo = () => {
    return cinemaInfo.map((element) => {
      const { biDanh, logo, maHeThongRap } = element;

      return (
        <button
          className="nav-link active"
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          data-toggle="pill"
          data-target={`#${maHeThongRap}`}
          type="button"
          role="tab"
          aria-selected="true"
        >
          <img className="img-fluid" src={logo} alt={biDanh} />
        </button>
      );
    });
  };

  const renderCinemaShowtime = () => {
    return cinemaInfo.map((element, index) => {
      return (
        <div
          className={`tab-pane fade show ${index === 0 && 'active'} `}
          id={element.maHeThongRap}
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          {element.tenHeThongRap}
        </div>
      );
    });
  };

  return (
    <div className="row">
      <div className="col-3">
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          {renderCinemaLogo()}
        </div>
      </div>

      <div className="col-9">
        <div className="tab-content text-white" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            ...
          </div>
          {renderCinemaShowtime()}
        </div>
      </div>
    </div>
  );
}
