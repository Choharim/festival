import { observable } from "mobx";

const LogInStore = observable({
  userName: "",
  setUserName(userName) {
    this.userName = userName;
  },

  logInSuccess: false,
  setLogInSuccess(result) {
    this.logInSuccess = result;
  },
});

export { LogInStore };
