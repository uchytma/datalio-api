export class DatasetCodeAlreadyExistsException extends Error {
  constructor() {
    super('Dataset code already exists.');
  }
}
