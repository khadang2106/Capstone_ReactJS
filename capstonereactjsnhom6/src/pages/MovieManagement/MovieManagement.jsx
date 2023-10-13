import React, { useState } from "react";
import useMovieList from "../../hooks/useMovieList";
import Switch from "@mui/material/Switch";
import { movieService } from "../../services/movie";
import { NavLink } from "react-router-dom";

export default function MovieManagement() {
  const movieList = useMovieList();
  console.log(movieList);
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
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(state);
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
        formData.append("maPhim", state.maPhim);
        await movieService.updateMovie(formData);
        alert("Cập nhật phim thành công!");
      } else {
        // Nếu không có mã phim, thì thêm phim mới
        await movieService.addMovie(formData);
        alert("Thêm phim thành công!");
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
      console.log(response);
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
  };
  //hàm xóa phim
  const handleDeleteClick = async (maPhim) => {
    try {
      if (window.confirm("Bạn có chắc muốn xóa phim này không?")) {
        await movieService.deleteMovie(maPhim);
        alert("Xóa phim thành công!");
        // Cập nhật lại danh sách phim sau khi xóa
        // ... (có thể gọi lại hàm fetch danh sách phim ở đây)
      }
    } catch (error) {
      console.error("Lỗi khi xóa phim:", error);
      alert("Có lỗi xảy ra khi xóa phim. Vui lòng thử lại.");
    }
  };
  const renderContent = () => {
    return movieList.map((element) => {
      return (
        <tr key={element.maPhim}>
          <td>{element.maPhim}</td>
          <td>
            <img
              style={{ height: 350, objectFit: "cover" }}
              className="card-img-top"
              src={element.hinhAnh}
              alt="movie"
            />
          </td>
          <td>{element.tenPhim}</td>
          <td>{element.moTa}</td>
          <td>
            <button
              onClick={() => handleEditClick(element.maPhim)}
              className="btn btn-info mr-2 "
              data-toggle="modal"
              data-target="#myModal"
            >
              SỬA
            </button>
            <button
              onClick={() => handleDeleteClick(element.maPhim)}
              className="btn btn-danger"
            >
              XÓA
            </button>
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
        <div role="tabpanel" className="tab-pane in active" id="DanhSachSP">
          <div className="row">
            <div
              className="col-8 d-flex justify-content-end "
              style={{ height: 40, marginBottom: "16px" }}
            >
              {/* BEGIN BUTTOM THÊM MỚI */}
              <button
                id="btnAddUser"
                className="btn btn-success mr-auto"
                data-toggle="modal"
                data-target="#myModal"
              >
                <i className="fa fa-plus mr-1" />
                Thêm Phim
              </button>
              {/* END BUTTON THÊM MỚI */}
            </div>
            {/* INPUT SEARCH */}
            <div className="col-12 form-group has-search mt-16">
              <div className="form-group mb-0">
                <div className="row">
                  <div className="col-11">
                    <input
                      type="text"
                      placeholder="Search by name..."
                      className="form-control"
                    />
                  </div>
                  <div className="col-1">
                    <button className="btn btn-danger">Tìm</button>
                  </div>
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
            {/* END TABLE SẢN PHẨM */}
          </div>
          <br />
        </div>
        {/* Kết thúc danh sách sản phẩm */}
      </div>
      {/*KetThuc Tabmenu*/}

      {/* The Modal */}
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title text-danger">Thêm phim</h4>
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
                  {/* validation ID */}
                  <div
                    className="text-danger"
                    style={{ display: "none" }}
                    id="errorID"
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
                  <div
                    className="text-danger"
                    style={{ display: "none" }}
                    id="errorHoTen"
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
                  <div
                    className="text-danger"
                    style={{ display: "none" }}
                    id="errorDiaChi"
                  />
                </div>
                {/**NGÀY CHIẾU */}
                <div className="form-group">
                  <label>Ngày chiếu</label>
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
                  <div
                    className="text-danger"
                    style={{ display: "none" }}
                    id="errorDiaChi"
                  />
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
                <button className="btn btn-primary">
                  {isEditing ? "Cập nhật" : "Thêm phim"}
                </button>
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
