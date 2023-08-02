import Verification from './verifications';

class EmailVerifications extends Verification {
  constructor(private readonly email: string) {
    super(email);
  }

  isValidFormat(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
  isValidDomain(): boolean {
    const emailDomains = ['br', 'com', 'org', 'net', 'edu', 'gov'];
    const emailDomain = this.email.split('.')[1];
    return emailDomains.some((domain) => emailDomain.includes(domain));
  }

  isValidProvider(): boolean {
    const emailDomains = [
      'outlook',
      'hotmail',
      'gmail',
      'yahoo',
      'live',
      'msn',
    ];
    const emailDomain = this.email.split('@')[1];
    return emailDomains.some((domain) => emailDomain.includes(domain));
  }

  getEmail(): string {
    return this.email;
  }
}

export default EmailVerifications;
