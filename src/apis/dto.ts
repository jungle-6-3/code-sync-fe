export class GlobalError {
  // TODO: 추후 BE와 Error code에 대해서 동기화 해야함.
  code: string;
  message: string;
  status: number;
  success = false
  constructor({ code, message, status }: GlobalError) {
    this.code = code;
    this.message = message;
    this.status = status;
  }
}

export class GlobalResponse<T> {
  success = true;
  message = "";
  data: T;
  constructor({ success, message, data }: GlobalResponse<T>) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}