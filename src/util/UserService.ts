class UserService {
  isAuthenticated = false;

  login(): void {
    this.isAuthenticated = true;
  }

  logout(): void {
    this.isAuthenticated = false;
  }
}
const userService = new UserService();
export default userService;
