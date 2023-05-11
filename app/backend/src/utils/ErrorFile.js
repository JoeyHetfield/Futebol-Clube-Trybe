export default class ErrorFile extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
