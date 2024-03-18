type ErrorParams = {
  message: string;
} | null;

export class NotFoundException extends Error {
  public result: unknown | null;
  public error: ErrorParams | null;
  public message: string;

  constructor(
    message: string,
    error: ErrorParams | undefined = null,
    result: unknown | null = null
  ) {
    super(message);
    this.result = result;
    this.error = error;
    this.message = message;
  }
}
