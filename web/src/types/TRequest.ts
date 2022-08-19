type TRequest = {
  serverUrl: string;
  method: string;
  headers?: {
    "Content-Type"?: string;
    authorization?: string;
  };
  body?: {};
};
export default TRequest;
