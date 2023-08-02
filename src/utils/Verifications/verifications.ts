class Verification {
  constructor(private readonly input: string) {}

  isSafeFromHtmlInjection(): boolean {
    const dangerousHtmlTags =
      /<\s*script|iframe|object|embed|form|input|button|textarea|select|link/i;
    return !dangerousHtmlTags.test(this.input);
  }
}

export default Verification;
