import { FC } from "react";
import { AiOutlineDislike } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import classes from "./dislike-button.module.css";

interface IDislikeikeButtonProps {
  dislikes: number;
  quoteId: string;
}

const DislikeButton: FC<IDislikeikeButtonProps> = (props) => {
  return (
    <Button variant="danger" className="mx-3">
      <div className={classes["buttons-body"]}>
        <span>{props.dislikes}</span>
        <AiOutlineDislike />
      </div>
    </Button>
  );
};

export default DislikeButton;
