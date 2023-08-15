class TokenVerification {
  public token: string;

  constructor(token: string) {
    this.token = token;
  }

  validateToken() {
    if (typeof this.token !== 'string' || this.token.length > 500) {
      return true;
    }
    return false;
  }
}

export { TokenVerification };
