import { Request, Response } from "express";
import * as env from "../../../config/env-config";
import jwt from "jsonwebtoken";

const refreshUserAccessToken = (req: Request, res: Response) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({ success: false, errors: [{ msg: "missing access token in header" }] });
    }
    const requestToken: string = req.headers.authorization!.split(" ")[1];
    jwt.verify(requestToken, env.REFRESH_TOKEN as string, (err, user) => {
      if (err) {
        return res.status(403).json({ success: false, errors: [{ msg: `failed authentication` }] });
      }
      // @ts-ignore: missing prop error
      const accessToken = jwt.sign({ user: user.userId }, env.ACCESS_TOKEN as string, { expiresIn: "1800s" });
      return res.status(200).json({
        success: true,
        errors: [{ msg: `authentication successful` }],
        data: { accessToken: `bearer ${accessToken}` },
      });
    });
  } catch {
    return res.status(500).json({ success: "false", errors: [{ msg: `an internal service error occured` }] });
  }
};

export default refreshUserAccessToken;

// let refreshTokenResponse: TRefreshTokenSResponse = {
//     statusCode: 403,
//     message: "unauthorized!",
//     success: false,
//   };
//   try {
//     const refreshToken: string = req.body!.refreshToken as string;
//     if (refreshToken === null || refreshToken === undefined) {
//       return res.status(refreshTokenResponse.statusCode).json({ data: refreshTokenResponse });
//     }
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err, user) => {
//       if (err) return res.status(refreshTokenResponse.statusCode).json({ data: refreshTokenResponse });
//       if (user === undefined) {
//         refreshTokenResponse.statusCode = 400;
//         return res.status(refreshTokenResponse.statusCode).json({ data: refreshTokenResponse });
//       }
//       if (!user.hasOwnProperty("user")) {
//         refreshTokenResponse.statusCode = 400;
//         return res.status(refreshTokenResponse.statusCode).json({ data: refreshTokenResponse });
//       }
//       //@ts-expect-error
//       console.log(user.user);
//       //@ts-expect-error
//       const accessToken = generateAccessToken(user.user);
//       refreshTokenResponse.statusCode = 200;
//       refreshTokenResponse.accessToken = accessToken;
//       refreshTokenResponse.refreshToken = refreshToken;
//       refreshTokenResponse.message = "authorized";
//       refreshTokenResponse.success = true;
//       return res.status(refreshTokenResponse.statusCode).json({ data: refreshTokenResponse });
//     });
//   } catch {
//     refreshTokenResponse.statusCode = 500;
//     refreshTokenResponse.message = "An internal error occured";
//     return res.status(refreshTokenResponse.statusCode).json({ data: refreshTokenResponse });
//   }
// };
