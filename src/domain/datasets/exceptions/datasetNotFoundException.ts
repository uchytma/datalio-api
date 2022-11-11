export class DatasetNotFoundException extends Error {
  constructor() {
    super('Dataset not found.');
  }
}
