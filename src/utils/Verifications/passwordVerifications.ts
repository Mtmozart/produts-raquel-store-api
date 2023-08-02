import Verification from './verifications';

class PasswordVerifications extends Verification {
  constructor(private readonly password: string) {
    super(password);
  }

  hasMoreThanThreeChars(): boolean {
    return this.password.length <= 3;
  }

  hasSpecialChars(): boolean {
    const specialCharsRegex = /[!@#$%^&*\-_+=|,.]/;
    return specialCharsRegex.test(this.password);
  }

  hasUppercase(): boolean {
    const upperCaseRegex = /[a-z]/;
    return upperCaseRegex.test(this.password);
  }
  hasLowercase(): boolean {
    const lowerCaseRegex = /[a-z]/;
    return lowerCaseRegex.test(this.password);
  }

  getPassword(): string {
    return this.password;
  }
}

export { PasswordVerifications };
