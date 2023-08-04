import { NameVerifications } from '../utils/Verifications/nameVerification';
import { PasswordVerifications } from '../utils/Verifications/passwordVerifications';
import EmailVerifications from '../utils/Verifications/emailVerification';

class ValidationServices {
  private nameVerifications: NameVerifications;
  private emailVerifications: EmailVerifications;
  private passwordVerifications: PasswordVerifications;
  constructor(name: string, email: string, password: string) {
    this.nameVerifications = new NameVerifications(name);
    this.emailVerifications = new EmailVerifications(email);
    this.passwordVerifications = new PasswordVerifications(password);
  }

  isValidName(name: string): boolean {
    if (
      this.nameVerifications.isNull() ||
      !this.nameVerifications.isValidFormat() ||
      !this.nameVerifications.isSafeFromHtmlInjection()
    ) {
      return false;
    }
    return true;
  }
  isValidEmail(email: string): boolean {
    if (
      this.emailVerifications.isNull() ||
      !this.emailVerifications.isValidFormat() ||
      !this.emailVerifications.isValidDomain() ||
      !this.emailVerifications.isValidProvider() ||
      !this.emailVerifications.isSafeFromHtmlInjection()
    ) {
      return false;
    }
    return true;
  }
  isValidPassword(password: string): boolean {
    if (
      this.passwordVerifications.isNull() ||
      !this.passwordVerifications.hasMoreThanThreeChars() ||
      !this.passwordVerifications.hasUppercaseAndLowercase() ||
      !this.passwordVerifications.isSafeFromHtmlInjection() ||
      !this.passwordVerifications.hasSpecialChars()
    ) {
      return false;
    }
    return true;
  }
}

export { ValidationServices };
