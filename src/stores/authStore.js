// authStore.js
import { observable, action, makeObservable } from 'mobx';

class AuthStore {
  isPasswordVerified = false;
  isAuthenticated = false;
  token = null;
  nextPage = '/'; 

  constructor() {
    makeObservable(this, {
      isAuthenticated: observable,
      isPasswordVerified: observable,
      nextPage: observable,
      token: observable,
      login: action,
      logout:action,
      setNextPage: action,
      verifyPassword: action,
    });
  }


  setNextPage(page) {
    this.nextPage = page;
  }

  getNextPage() {
    return this.nextPage;
  }

  verifyPassword(token) {
    this.isPasswordVerified = true;
    this.token = token;
    // You can also persist token in localStorage here
  }

  login(token) {
    this.token = token;
    this.isAuthenticated = true;
    // localStorage.setItem('auth_token', token);
    // localStorage.setItem('is_authenticated', true);
    // You can also persist token in localStorage here
  }
  
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    // localStorage.removeItem('auth_token', token);
    // localStorage.removeItem('is_authenticated', false);
    // Clear token from localStorage here
  }

  getToken() {
    return this.token;
  }
}

const authStore = new AuthStore();
export default authStore;
