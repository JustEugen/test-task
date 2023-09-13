type Options<TCode extends string> = {
  code: TCode;
};

export class ServiceError<TCode extends string> extends Error {
  public isServiceError = true;
  public code: TCode;

  constructor(options: Options<TCode>) {
    super(options.code);

    this.code = options.code;
  }
}
