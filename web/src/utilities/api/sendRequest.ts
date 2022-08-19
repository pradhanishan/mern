import TRequest from "../../types/TRequest";
import TResponse from "../../types/TResponse";
import applicationConfig from "../../config/application-config";

const sendRequest = async (request: TRequest): Promise<TResponse> => {
  const requestOptions = {
    method: request.method,
    headers: {
      ...(request.headers || {}),
    },
    body: JSON.stringify({ ...(request.body || {}) }),
  };
  const response = await fetch(request.serverUrl, requestOptions);

  const responseData: TResponse = await response.json();

  if (!responseData.success) {
    // if the request failed but it is not because of failed validation of access token, then return.
    if (responseData.statusCode !== 403) {
      return responseData;
    }
    // if the request failed due to failed access token validation then try to refresh the access token and send the request again.
    const refreshUrl: string = `${applicationConfig.serverUrl}/auth/refresh-token`;
    const refreshOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("refreshToken") || "",
      },
    };

    const refreshResponse = await fetch(refreshUrl, refreshOptions);
    const refreshResponseData: TResponse = await refreshResponse.json();

    // if validating refresh token failed then return [the user authorization fails at this point.]
    if (!refreshResponseData.success) {
      return refreshResponseData;
    }
    // resend fetch request to access data.
    localStorage.setItem("accessToken", refreshResponseData.data.accessToken);
    const newRequestOptions = {
      method: request.method,
      headers: {
        ...request.headers,
        authorization: refreshResponseData.data.accessToken,
      },
      body: JSON.stringify({ ...request.body }),
    };
    const newResponse = await fetch(request.serverUrl, newRequestOptions);
    const newResponseData: TResponse = await newResponse.json();

    return newResponseData;
  }

  // if post request is successful.
  return responseData;
};

export default sendRequest;
