export default class ErrorFile extends Error {
  constructor(message: string, status: number) {
    super(message);
  }
}
