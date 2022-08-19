type TResponse = {
  statusCode: number;
  success: boolean;
  errors?: { msg: string }[];
  data?: any;
};

export default TResponse;
