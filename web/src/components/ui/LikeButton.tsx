import { FC } from "react";
import Button from "react-bootstrap/Button";
import classes from "./like-button.module.css";
import sendRequest from "../../utilities/api/sendRequest";
import applicationConfig from "../../config/application-config";
import TRequest from "../../types/TRequest";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { modalActions } from "../../redux/slices/modal-slice";
import { requestActions } from "../../redux/slices/request-slice";

interface ILikeButtonProps {
  likes: number;
  quoteId: string;
  likedByMe: boolean;
}

const LikeButton: FC<ILikeButtonProps> = (props) => {
  const dispatch = useAppDispatch();

  const sendLikeHandler = async (event: React.MouseEvent): Promise<void> => {
    const likeData: { quoteId: string } = {
      quoteId: props.quoteId,
    };

    const request: TRequest = {
      serverUrl: `${applicationConfig.serverUrl}/quotes/like`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken")!,
      },
      body: {
        ...likeData,
      },
    };

    const responseData = await sendRequest(request);
    if (!responseData.success) {
      dispatch(
        modalActions.open({
          isOpen: true,
          title: "Error",
          content: "An unknown error occured",
          link: "/",
        })
      );
      return;
    }
    dispatch(requestActions.increase());
    return;
  };

  return (
    <Button variant={props.likedByMe ? "danger" : "success"} onClick={sendLikeHandler}>
      <div className={classes["buttons-body"]}>{props.likedByMe ? "dislike" : "like"}</div>
    </Button>
  );
};

export default LikeButton;
