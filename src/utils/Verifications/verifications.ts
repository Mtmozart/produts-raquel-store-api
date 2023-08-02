class Verification {
  constructor(private readonly input: string) {}

  isNull(): boolean {
    return this.input.length === 0;
  }
  haveCharsProhibited(): boolean {
    const charProhibitedRegex = /['(){}"";:/?]/;
    return charProhibitedRegex.test(this.input);
  }

  isSafeFromHtmlInjection(): boolean {
    const dangerousHtmlTags =
      /<\s*script|iframe|object|embed|form|input|button|textarea|select|link/i;
    return !dangerousHtmlTags.test(this.input);
  }
}

export default Verification;
