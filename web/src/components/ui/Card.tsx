import { FC } from "react";
import classes from "./card.module.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import Button from "react-bootstrap/Button";
import LikeButton from "./LikeButton";

interface ICardProps {
  _id: string;
  quote: string;
  author: string;
  likes: number;
  dislikes: number;
  likedByMe: boolean;
}

const Card: FC<ICardProps> = (props) => {
  return (
    <div className={classes["card-container"]}>
      <div>
        <h4 className={classes["card-head"]}>
          <span>{props.author} </span>
          <span>
            {props.likes} {props.likes === 1 ? "like" : "likes"}
          </span>
        </h4>

        <hr />
      </div>

      <div className={classes["card-body"]}>
        <FaQuoteLeft />
        <p>{props.quote}</p>
        <FaQuoteRight />
        <hr />
      </div>

      <div className={classes["card-tail"]}>
        <div className={classes["button-container"]}>
          <LikeButton likes={props.likes} quoteId={props._id} likedByMe={props.likedByMe} />
        </div>
        <div className={classes["report-container"]}>
          <Button variant="secondary">
            <MdReportProblem size={24} color="#FFB200" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
