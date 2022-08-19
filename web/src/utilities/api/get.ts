import applicationConfig from "../../config/application-config";
import TResponse from "../../types/TResponse";

const get = async (serverUrl: string): Promise<TResponse> => {
  const response = await fetch(serverUrl, {
    headers: {
      authorization: localStorage.getItem("accessToken")!,
    },
  });
  const responseData = await response.json();
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
    const newResponse = await fetch(serverUrl, {
      headers: {
        authorization: localStorage.getItem("accessToken")!,
      },
    });
    const newResponseData = await response.json();
    return newResponseData;
  }
  return responseData;
};

export default get;
