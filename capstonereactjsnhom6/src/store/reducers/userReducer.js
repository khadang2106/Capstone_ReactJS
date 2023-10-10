import { SET_USER_INFO } from "../types/userType";

const DEFAULT_STATE = {
  userInfo: null,
};
//tạo 1 biến check trường hợp local có thông tin đăng nhập chưa?
const stringify = localStorage.getItem("USER_INFO");
//nếu stringfy có thì gán DEFAULT_STATE = stringify
if(stringify){
  DEFAULT_STATE.userInfo = JSON.parse(stringify);
}
export const userReducer = (state = DEFAULT_STATE, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_USER_INFO: {
      state.userInfo = action.payload;
      break;
    }
  }
  return { ...state };
};
