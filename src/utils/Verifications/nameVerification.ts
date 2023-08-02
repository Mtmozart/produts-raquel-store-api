import Verification from './verifications';

class NameVerifications extends Verification {
  constructor(private readonly name: string) {
    super(name);
  }

  isValidFormat(): boolean {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(this.name);
  }
  getName(): string {
    return this.name;
  }
}

export { NameVerifications };
