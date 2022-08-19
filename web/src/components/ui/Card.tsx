import { FC } from "react";
import classes from "./card.module.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import Button from "react-bootstrap/Button";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

interface ICardProps {
  _id: string;
  quote: string;
  author: string;
  likes: number;
  dislikes: number;
}

const Card: FC<ICardProps> = (props) => {
  return (
    <div className={classes["card-container"]}>
      <div className={classes["card-head"]}>
        <h4>{props.author}</h4>
        <hr />
      </div>

      <div className={classes["card-body"]}>
        <FaQuoteLeft />
        <p>{props.quote}</p>
        <FaQuoteRight />
        <hr />
        <span>test</span>
      </div>

      <div className={classes["card-tail"]}>
        <div className={classes["button-container"]}>
          <Button variant="success" className="mx-1">
            <div className={classes["buttons-body"]}>
              <span>{props.likes}</span>
              <AiOutlineLike />
            </div>
          </Button>
          <Button variant="danger" className="mx-1">
            <div className={classes["buttons-body"]}>
              <span>{props.dislikes}</span>
              <AiOutlineDislike />
            </div>
          </Button>
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
