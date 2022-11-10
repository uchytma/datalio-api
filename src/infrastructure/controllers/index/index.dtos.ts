export class IndexResponseDto {
  public constructor(init?: Partial<IndexResponseDto>) {
    Object.assign(this, init);
  }
  message: string;
}
