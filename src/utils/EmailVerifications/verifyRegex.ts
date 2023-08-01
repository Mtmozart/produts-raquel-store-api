class EmailValidator {
  constructor(private readonly email: string) {}

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

  isSafeFromHtmlInjection(): boolean {
    const dangerousHtmlTags =
      /<\s*script|iframe|object|embed|form|input|button|textarea|select|link/i;
    return !dangerousHtmlTags.test(this.email);
  }

  getEmail(): string {
    return this.email;
  }
}

export default EmailValidator;
