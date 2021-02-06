import { observable } from "mobx";

const LogInStore = observable({
  userName: "",
  setUserName(userName) {
    this.userName = userName;
  },

  nickName: "",
  setNickName(nickName) {
    this.nickName = nickName;
  },

  logInSuccess: false,
  setLogInSuccess(result) {
    this.logInSuccess = result;
  },
});

export { LogInStore };
