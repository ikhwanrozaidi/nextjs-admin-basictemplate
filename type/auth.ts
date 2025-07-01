export class AuthCredentials {
  email: string;
  password: string;

  constructor(email: string = "", password: string = "") {
    this.email = email;
    this.password = password;
  }

  isEmpty(): boolean {
    return !this.email.trim() || !this.password.trim();
  }

  isValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email) && this.password.length >= 6;
  }
}
