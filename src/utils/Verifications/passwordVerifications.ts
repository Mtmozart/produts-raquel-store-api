import Verification from './verifications';

class PasswordVerifications extends Verification {
  constructor(private readonly password: string) {
    super(password);
  }

  hasMoreThanThreeChars(): boolean {
    return this.password.length >= 3;
  }

  hasSpecialChars(): boolean {
    const specialCharsRegex = /[!@#$%^&*\-_+=|,.]/;
    return specialCharsRegex.test(this.password);
  }

  hasUppercaseAndLowercase(): boolean {
    const uppercaseAndLowercaseRegex = /[a-zA-Z]/;
    return uppercaseAndLowercaseRegex.test(this.password);
  }

  getPassword(): string {
    return this.password;
  }
}

export { PasswordVerifications };
