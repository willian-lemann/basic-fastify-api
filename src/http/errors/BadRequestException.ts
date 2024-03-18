type ErrorParams = {
  message: string;
} | null;

export class BadRequestException extends Error {
  public result: unknown | null;
  public error: ErrorParams | null;
  public message: string;

  constructor(
    message: string,
    error: ErrorParams | undefined = null,
    result: unknown | null = null
  ) {
    super(message);
    this.result = null;
    this.error = { message };
    this.message = message;
  }
}
