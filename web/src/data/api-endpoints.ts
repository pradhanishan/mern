/*

Why create this object? 

To document api useage guide.

- Let's look at the alternatives to documenting your api.

1. Learn swagger doc and swagger ui [Recommended, it just isn't for me.]
    - Personally, I think the learning curve and implementation effort is not worth the reward for swagger when working in express. 
    (It is however worth it when working with asp.net core as it is relatively better to implement and documentation is easier to find online).
    - I use postman to test APIs anyway.

2. Serve a documentation response page from your express server

    - Too difficult to style and does not support automatic typescript compilation

3. External documentation tools such as google docs, github, microsoft word etc.

    - wtf.

drawbacks:

1. You need to create a ui and an object manually.
2. Since all details are entered manually, you could miss an api information.
3. Server and api documentation are separated.

benefits:

1. You have more control and flexibility in designing your api document.
2. In my experience, documenting api manually helps you to review them as well
 so this is a win-win if you don't make human errors or development time is not a concern.

*/

import TApiDetail from "../types/TApiDetail";

const apiDetails: TApiDetail = [
  {
    // api details for quotes
    _id: "quotes",
    title: "quotes api",
    details: [
      {
        _id: "quotes-get",
        path: "http://localhost:5000/quotes",
        method: "GET",
        header: "Authorization - access token (jwt)",
        responses: [
          {
            _id: "quotes-get-response-0",
            data: "undefined",
            errors: "array of object of errors with properties msg",
            statusCode: "500",
            success: "false",
          },
          {
            _id: "quotes-get-response-1",
            data: "an array of object quotes with properties _id, quote, likes, dislikes and anonymous",
            errors: "undefined",
            statusCode: "200",
            success: "true",
          },
        ],
        body: "",
      },
      {
        _id: "quotes-post",
        path: "http://localhost:5000/quotes",
        method: "POST",
        header: "Authorization - access token (jwt)",
        responses: [
          {
            _id: "quotes-post-response-0",
            data: "undefined",
            errors: "array of object of errors with properties (msg, param and location) or (msg)",
            statusCode: "400",
            success: "false",
          },
          {
            _id: "quotes-post-response-1",
            data: "undefineed",
            errors: "undefined",
            statusCode: "201",
            success: "true",
          },
          {
            _id: "quotes-post-response-2",
            data: "undefined",
            errors: "array of object of errors with properties msg",
            statusCode: "500",
            success: "false",
          },
          {
            _id: "quotes-post-response-3",
            data: "undefined",
            errors: "array of object of errors with properties msg",
            statusCode: "403",
            success: "false",
          },
        ],
        body: "{quote:string,anonymous:boolean}",
      },
      {
        _id: "quotes-delete",
        path: "http://localhost:5000/quotes",
        method: "DELETE",
        header: "Authorization - access token (jwt)",
        responses: [
          {
            _id: "quotes-delete-response-0",
            data: "undefined",
            errors: "array of object of errors with properties (msg, param and location) or (msg)",
            statusCode: "400",
            success: "false",
          },
          {
            _id: "quotes-delete-response-1",
            data: "undefined",
            errors: "undefined",
            statusCode: "200",
            success: "true",
          },
        ],
        body: "",
      },
    ],
  },
  {
    _id: "auth",
    title: "authentication api",
    details: [
      {
        _id: "auth-register",
        path: "https://localhost:5000/auth/register",
        method: "POST",
        header: "",
        body: "{username:string, password:string,email:string}",
        responses: [
          {
            _id: "auth-register-response-0",
            statusCode: "400",
            errors: "array of object of errors with properties (msg, param and location) or (msg)",
            success: "false",
            data: "undefined",
          },
          {
            _id: "auth-register-response-1",
            statusCode: "200",
            errors: "undefined",
            success: "true",
            data: "undefined",
          },
          {
            _id: "auth-register-response-2",
            statusCode: "500",
            errors: "array of object of errors with property (msg)",
            success: "false",
            data: "undefined",
          },
        ],
      },
      {
        _id: "auth-login",
        path: "https://localhost:5000/auth/logout",
        method: "POST",
        header: "",
        body: "{identifier:string,password:string}",
        responses: [
          {
            _id: "auth-login-response-0",
            statusCode: "400",
            errors: "array of object of errors with properties (msg, param and location) or (msg)",
            success: "false",
            data: "undefined",
          },
          {
            _id: "auth-login-response-1",
            statusCode: "200",
            errors: "undefined",
            success: "true",
            data: "authentication token and refresh token",
          },
          {
            _id: "auth-login-response-2",
            statusCode: "500",
            errors: "array of object of errors with property (msg)",
            success: "false",
            data: "undefined",
          },
        ],
      },
      {
        _id: "refresh-token",
        path: "https://localhost:5000/auth/refresh-token",
        method: "POST",
        header: "Authorization - access token (jwt)",
        body: "",
        responses: [
          {
            _id: "auth-refresh-token-response-0",
            statusCode: "400",
            errors: "array of object of errors with property (msg)",
            success: "false",
            data: "undefined",
          },
          {
            _id: "auth-refresh-token-response-1",
            statusCode: "403",
            errors: "array of object of errors with property (msg)",
            success: "false",
            data: "undefined",
          },
          {
            _id: "auth-auth-refresh-token-response-2",
            statusCode: "200",
            errors: "undefined",
            success: "true",
            data: "access token",
          },
          {
            _id: "auth-auth-refresh-token-response-3",
            statusCode: "500",
            errors: "array of object of errors with property (msg)",
            success: "false",
            data: "undefined",
          },
        ],
      },
      {
        _id: "auth-logout",
        path: "https://localhost:5000/auth/logout",
        method: "DELETE",
        header: "Authorization - refresh token (jwt)",
        body: "",
        responses: [
          {
            _id: "auth-logout-response-0",
            statusCode: "400",
            errors: "array of object of errors with property (msg)",
            success: "false",
            data: "undefined",
          },
          {
            _id: "auth-logout-response-1",
            statusCode: "200",
            errors: "undefined",
            success: "true",
            data: "undefined",
          },
          {
            _id: "auth-logout-response-2",
            statusCode: "500",
            errors: "array of object of errors with property (msg)",
            success: "false",
            data: "undefined",
          },
        ],
      },
    ],
  },
];

export default apiDetails;
