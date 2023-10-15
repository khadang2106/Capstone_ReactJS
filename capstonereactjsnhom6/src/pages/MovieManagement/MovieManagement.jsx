import React, { useEffect, useState } from "react";
import useMovieList from "../../hooks/useMovieList";
import Switch from "@mui/material/Switch";
import { movieService } from "../../services/movie";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
export default function MovieManagement() {
  const movieList = useMovieList();
  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [state, setState] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    dangChieu: false,
    sapChieu: false,
    hot: false,
    danhGia: "",
    hinhAnh: null,
    heThongRap: "",
    giaVe: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  //hàm chuyển đổi định dạng ngày tháng năm theo yêu cầu BE
  const formatDateToSend = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("tenPhim", state.tenPhim);
    formData.append("trailer", state.trailer);
    formData.append("moTa", state.moTa);
    formData.append("ngayKhoiChieu", formatDateToSend(state.ngayKhoiChieu));
    formData.append("dangChieu", state.dangChieu);
    formData.append("sapChieu", state.sapChieu);
    formData.append("hot", state.hot);
    formData.append("danhGia", state.danhGia);
    formData.append("hinhAnh", state.hinhAnh);
    try {
      if (state.maPhim) {
        // Nếu có mã phim, thì cập nhật phim
        if (
          window.confirm(
            `Bạn có chắc muốn cập nhật người phim ${state.tenPhim} không?`
          )
        ) {
          formData.append("maPhim", state.maPhim);
          await movieService.updateMovie(formData);
          alert("Cập nhật phim thành công!");
          document.getElementById("close").click();
        }
      } else {
        // Nếu không có mã phim, thì thêm phim mới
        if (window.confirm("Bạn có chắc muốn thêm phim này không?")) {
          await movieService.addMovie(formData);
          alert("Thêm phim thành công!");
          document.getElementById("close").click();
        }
      }
      // Cập nhật danh sách phim hoặc thực hiện các hành động khác nếu cần
    } catch (error) {
      console.error("Lỗi khi thêm/cập nhật phim:", error);
      alert("Có lỗi xảy ra khi thêm/cập nhật phim. Vui lòng thử lại.");
    }
  };
  //hàm hình ảnh
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setState({
        ...state,
        hinhAnh: file,
      });
    }
  };
  //hàm này để switch các button dangChieu,sapChieu,Hot
  const handleSwitchChange = (name) => (event) => {
    setState({
      ...state,
      [name]: event.target.checked,
    });
  };
  //hàm này để nhấn nút sửa
  const handleEditClick = async (maPhim) => {
    setIsEditing(true);
    try {
      const response = await movieService.fetMovieDetailApi(maPhim);
      if (response.data) {
        setState({
          ...response.data.content,
          hinhAnh: null, // Reset hình ảnh vì chúng ta sẽ cần người dùng chọn lại
          maPhim: response.data.content.maPhim,
        });
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin chi tiết phim:", error);
      alert("Có lỗi xảy ra khi lấy thông tin chi tiết phim. Vui lòng thử lại.");
    }
  };
  //hàm này để xem người dùng click vào sửa hay thêm
  const [isEditing, setIsEditing] = useState(false);
  const handleCloseModal = () => {
    setIsEditing(false);
    resetLichChieuForm();
  };
  //hàm xóa phim
  const handleDeleteClick = async (maPhim) => {
    try {
      if (window.confirm("Bạn có chắc muốn xóa phim này không?")) {
        await movieService.deleteMovie(maPhim);
        alert("Xóa phim thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi xóa phim:", error);
      alert("Có lỗi xảy ra khi xóa phim. Vui lòng thử lại.");
    }
  };
  //hàm này reset data trong form
  const resetForm = () => {
    setState({
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: "",
      hinhAnh: "",
    });
  };
  const handleAddMovieClick = () => {
    resetForm();
  };
  //hàm này để lấy hệ thống rạp
  const [heThongRap, setHeThongRap] = useState([]);
  const fetchHeThongRap = async () => {
    try {
      const response = await movieService.getHeThongRap();
      if (response.data) {
        setHeThongRap(response.data.content);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin hệ thống rạp:", error);
    }
  };
  useEffect(() => {
    fetchHeThongRap();
    setDefaultSelectedHeThongRap("");
  }, []);
  //hàm này để lấy cụm rạp dựa theo hệ thống rạp
  const [cumRapList, setCumRapList] = useState([]);
  const [selectedHeThongRap, setSelectedHeThongRap] = useState("");
  const handleHeThongRapChange = async (event) => {
    const maHeThongRap = event.target.value;
    setSelectedHeThongRap(maHeThongRap);

    try {
      const response = await movieService.getHeThongCumRap(maHeThongRap);
      if (response.data) {
        setCumRapList(response.data.content);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin cụm rạp:", error);
    }
  };
  const renderCumRapList = () => {
    return cumRapList.map((cumRap) => (
      <option key={cumRap.maCumRap} value={cumRap.maCumRap}>
        {cumRap.tenCumRap}
      </option>
    ));
  };
  //chuyển đổi định dạng khi tạo lịch chiếu
  const formatDateToSendTaoLichChieu = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
  //hàm này để tạo lịch chiếu
  const handleTaoLichChieu = async (event) => {
    event.preventDefault();
    const { cumRap, ngayKhoiChieu, giaVe, maPhim } = state;
    if (!giaVe) {
      setGiaVeError("Giá vé không được để trống.");
      return;
    } else if (!/^\d+$/.test(giaVe)) {
      setGiaVeError("Giá vé chỉ được nhập số.");
      return;
    } else {
      setGiaVeError("");
    }
    try {
      const ngayChieuGioChieu = formatDateToSendTaoLichChieu(ngayKhoiChieu);
      const lichChieuData = {
        maPhim: maPhim,
        maRap: cumRap,
        ngayChieuGioChieu: ngayChieuGioChieu,
        giaVe: giaVe,
      };
      if (
        window.confirm(
          `Bạn có chắc muốn tạo lịch chiếu cho phim ${state.tenPhim} không?`
        )
      ) {
        const response = await movieService.createLichChieu(lichChieuData);
        if (response.data) {
          alert("Tạo lịch chiếu thành công!");
          document.getElementById("closeTaoLichChieu").click();
          resetLichChieuForm();
        }
      }
    } catch (error) {
      console.error("Lỗi khi tạo lịch chiếu:", error);
      alert(" Vui lòng chọn đầy đủ thông tin và thử lại!");
    }
  };
  //reset form tạo lịch chiếu
  const [defaultSelectedHeThongRap, setDefaultSelectedHeThongRap] =
    useState("");
  const resetLichChieuForm = () => {
    setSelectedHeThongRap(defaultSelectedHeThongRap);
  };
  //validation giá vé
  const [giaVeError, setGiaVeError] = useState("");
  //hàm search
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const [searchInitiated, setSearchInitiated] = useState(false);
  const handleSearchClick = async () => {
    try {
      if (searchInput.trim() === "") {
        alert("Vui lòng nhập từ khóa tìm kiếm.");
      } else {
        const response = await movieService.searchMovies(searchInput);
        if (response.data) {
          setSearchResult(response.data.content);
          setCurrentPage(1);
          setSearchInitiated(true); 
          setShowAllButtonVisible(true);
        }
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm phim:", error);
      alert("Có lỗi xảy ra khi tìm kiếm phim. Vui lòng thử lại.");
    }
  };
  const [showAllButtonVisible, setShowAllButtonVisible] = useState(false);
  const [showAllMovies, setShowAllMovies] = useState(true);
  const handleShowAllClick = () => {
    setShowAllMovies(true);
    setSearchInput("");
    setSearchResult([]); 
    setCurrentPage(1); 
    setShowAllButtonVisible(false);
  };
  const currentMovies = showAllMovies
    ? movieList.slice(indexOfFirstMovie, indexOfLastMovie)
    : searchResult.slice(indexOfFirstMovie, indexOfLastMovie);
  const pageNumbers = [];
  const totalMovies = showAllMovies ? movieList.length : searchResult.length;
  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderContent = () => {
    const moviesToRender =
      searchResult.length > 0 ? searchResult : currentMovies;
    return moviesToRender.map((element) => {
      return (
        <tr key={element.maPhim}>
          <td>{element.maPhim}</td>
          <td>
            <img
              style={{ height: "150px", width: "auto", objectFit: "contain" }}
              className="card-img-top"
              src={element.hinhAnh}
              alt="movie"
            />
          </td>
          <td>{element.tenPhim}</td>
          <td>{element.moTa}</td>
          <td>
            <div className="btn-group">
              <button
                onClick={() => handleEditClick(element.maPhim)}
                className="btn btn-info"
                data-toggle="modal"
                data-target="#myModal"
              >
                <EditIcon fontSize="small" />
              </button>
              <button
                onClick={() => handleDeleteClick(element.maPhim)}
                className="btn btn-danger"
              >
                <DeleteIcon fontSize="small" />
              </button>
              <button
                onClick={() => {
                  handleEditClick(element.maPhim);
                }}
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#myModalTaoLichChieu"
              >
                <CalendarTodayIcon fontSize="small" />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="container">
      <h2
        style={{
          textAlign: "center",
          color: "rgb(245, 48, 48)",
          fontSize: 40,
          fontWeight: "bold",
          paddingTop: 20,
        }}
      >
        QUẢN LÝ PHIM
      </h2>
      {/* Phan tab menu */}
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            role="tab"
            data-toggle="tab"
            style={{ fontWeight: 800 }}
          >
            Danh Sách Phim
          </NavLink>
        </li>
      </ul>
      <br />
      {/* Tab panes */}
      <div className="tab-content">
        {/*Danh sách đối tượng */}
        <div role="tabpanel" className="tab-pane in active">
          <div className="row">
            <div
              className="col-8 d-flex justify-content-end "
              style={{ height: 40, marginBottom: "16px" }}
            >
              {/* BEGIN BUTTOM THÊM MỚI */}
              <button
                onClick={handleAddMovieClick}
                id="btnAddUser"
                className="btn btn-success mr-auto"
                data-toggle="modal"
                data-target="#myModal"
              >
                <i className="fa fa-plus mr-1" />
                Thêm phim
              </button>
              {/* END BUTTON THÊM MỚI */}
            </div>
            {/* INPUT SEARCH */}
            <div className="col-12 form-group has-search mt-16">
              <div className="form-group mb-0">
                <div className="row">
                  <div className="col-9">
                    <input
                      type="text"
                      placeholder="Nhập tên phim..."
                      className="form-control"
                      value={searchInput}
                      onChange={handleSearchInputChange}
                    />
                  </div>
                  <div className="col-1">
                    <button
                      className="btn btn-danger"
                      onClick={handleSearchClick}
                    >
                      Tìm
                    </button>
                  </div>
                  {showAllButtonVisible && (
                    <div className="col-2">
                      <button
                        className="btn btn-primary"
                        onClick={handleShowAllClick}
                      >
                        Xem tất cả
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="clear-fix" />
          <div className="tblSanPham" id="tblSanPham">
            {/* BEGIN TABLE SẢN PHẨM */}
            <div className="loader" id="loader" />
            <table className="table table-bordered">
              <thead align="center">
                <tr>
                  <th>Mã Phim</th>
                  <th>Hình Ảnh</th>
                  <th>Tên Phim</th>
                  <th>Mô Tả</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>{renderContent()}</tbody>
            </table>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => {
                    if (currentPage > 1) {
                      handlePageChange(currentPage - 1);
                    }
                  }}
                >
                  Prev
                </button>
              </li>
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === pageNumbers.length ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => {
                    if (currentPage < pageNumbers.length) {
                      handlePageChange(currentPage + 1);
                    }
                  }}
                >
                  Next
                </button>
              </li>
            </ul>
            {/* END TABLE SẢN PHẨM */}
          </div>
          <br />
        </div>
        {/* Kết thúc danh sách sản phẩm */}
      </div>
      {/*KetThuc Tabmenu*/}

      {/* The Modal Thêm Phim Và Cập Nhật Phim */}
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title text-danger">
                {isEditing ? "Cập nhật phim" : "Thêm phim mới"}
              </h4>
              <button
                onClick={handleCloseModal}
                type="button"
                className="close"
                data-dismiss="modal"
                id="close"
              >
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* TÊN PHIM */}
                <div className="form-group">
                  <label>Tên phim</label>
                  <input
                    value={state.tenPhim || ""}
                    onChange={handleChange}
                    name="tenPhim"
                    className="form-control"
                    placeholder="Nhập tên phim..."
                  />
                </div>
                {/* TRAILER */}
                <div className="form-group">
                  <label>Trailer</label>
                  <input
                    value={state.trailer || ""}
                    onChange={handleChange}
                    name="trailer"
                    className="form-control"
                    placeholder="Nhập đường dẫn trailer..."
                  />
                </div>
                {/* MÔ TẢ */}
                <div className="form-group">
                  <label>Mô tả</label>
                  <input
                    value={state.moTa || ""}
                    onChange={handleChange}
                    name="moTa"
                    className="form-control"
                    placeholder="Nhập mô tả..."
                  />
                </div>
                {/**NGÀY CHIẾU */}
                <div className="form-group">
                  <label>Ngày khởi chiếu</label>
                  <input
                    value={state.ngayKhoiChieu || ""}
                    onChange={handleChange}
                    type="datetime-local"
                    name="ngayKhoiChieu"
                    className="form-control"
                  />
                </div>
                {/**ĐANG CHIẾU */}
                <div className="form-group">
                  <label>Đang chiếu:</label>
                  <Switch
                    checked={state.dangChieu}
                    onChange={handleSwitchChange("dangChieu")}
                    inputProps={{ "aria-label": "Size switch demo" }}
                  />
                </div>
                {/**SẮP CHIẾU */}
                <div className="form-group">
                  <label>Sắp chiếu:</label>
                  <Switch
                    checked={state.sapChieu}
                    onChange={handleSwitchChange("sapChieu")}
                    inputProps={{ "aria-label": "Size switch demo" }}
                  />
                </div>
                {/**HOT */}
                <div className="form-group">
                  <label>Hot:</label>
                  <Switch
                    checked={state.hot}
                    onChange={handleSwitchChange("hot")}
                    inputProps={{ "aria-label": "Size switch demo" }}
                  />
                </div>
                {/**SỐ SAO */}
                <div className="form-group">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ marginRight: "10px" }}>Đánh giá:</label>
                    <input
                      value={state.danhGia || ""}
                      onChange={handleChange}
                      name="danhGia"
                      className="form-control"
                      style={{ width: "50px" }}
                    />
                  </div>
                </div>
                {/**Hình ảnh */}
                <div
                  className="form-group"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label style={{ marginRight: "10px" }}>Hình ảnh:</label>
                  <input
                    type="file"
                    className="form-control"
                    style={{ flexGrow: 1 }}
                    onChange={handleImageChange}
                  />
                  {state.hinhAnh && (
                    <img
                      src={URL.createObjectURL(state.hinhAnh)}
                      alt="Selected"
                      style={{
                        width: "50px",
                        height: "50px",
                        marginLeft: "10px",
                      }}
                    />
                  )}
                </div>
                <div className="text-right">
                  {isEditing ? (
                    <button className="btn btn-primary">Cập nhật</button>
                  ) : (
                    <button className="btn btn-primary">Thêm</button>
                  )}
                </div>
              </form>
            </div>
            {/* Modal footer */}
            <div className="modal-footer" id="cancel" />
          </div>
        </div>
      </div>
      {/**THE MODAL TẠO LỊCH CHIẾU PHIM */}
      <div className="modal fade" id="myModalTaoLichChieu">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title text-danger">
                Tạo Lịch Chiếu - {state.tenPhim}
              </h4>
              <button
                onClick={handleCloseModal}
                type="button"
                className="close"
                data-dismiss="modal"
                id="closeTaoLichChieu"
              >
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form onSubmit={handleTaoLichChieu}>
                {/* HỆ THỐNG RẠP */}
                <div className="form-group">
                  <label>Hệ thống rạp:</label>
                  <select
                    value={selectedHeThongRap}
                    onChange={handleHeThongRapChange}
                    name="heThongRap"
                    className="form-control"
                  >
                    <option value="" disabled>
                      Chọn hệ thống rạp
                    </option>
                    {heThongRap.map((rap) => (
                      <option key={rap.maHeThongRap} value={rap.maHeThongRap}>
                        {rap.tenHeThongRap}
                      </option>
                    ))}
                  </select>
                </div>
                {/* CỤM RẠP */}
                <div className="form-group">
                  <label>Cụm rạp:</label>
                  <select
                    value={state.cumRap || ""}
                    onChange={handleChange}
                    name="cumRap"
                    className="form-control"
                  >
                    <option value="" disabled>
                      Chọn cụm rạp
                    </option>
                    {renderCumRapList()}{" "}
                    {/* Sử dụng hàm renderCumRapList để hiển thị danh sách cụm rạp */}
                  </select>
                </div>
                {/**NGÀY CHIẾU - GIỜ CHIẾU */}
                <div className="form-group">
                  <label>Ngày chiếu - Giờ chiếu:</label>
                  <input
                    value={state.ngayChieuGioChieu || ""}
                    onChange={handleChange}
                    type="datetime-local"
                    name="ngayChieuGioChieu"
                    className="form-control"
                  />
                </div>
                {/**GIÁ VÉ */}
                <div className="form-group">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ marginRight: "10px" }}>Giá vé:</label>
                    <input
                      value={state.giaVe || ""}
                      onChange={handleChange}
                      name="giaVe"
                      className="form-control"
                      style={{ width: "100px" }}
                    />
                  </div>
                  {giaVeError && (
                    <div className="text-danger">{giaVeError}</div>
                  )}
                </div>
                <div className="text-right">
                  <button className="btn btn-primary">Tạo</button>
                </div>
              </form>
            </div>
            {/* Modal footer */}
            <div className="modal-footer" id="cancel" />
          </div>
        </div>
      </div>
    </div>
  );
}
