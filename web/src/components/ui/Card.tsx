import { FC } from "react";
import classes from "./card.module.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import Button from "react-bootstrap/Button";

interface ICardProps {}

const Card: FC = () => {
  return (
    <div className={classes["card-container"]}>
      <div className={classes["card-head"]}>
        <h4>authorname</h4>
        <hr />
      </div>

      <div className={classes["card-body"]}>
        <FaQuoteLeft />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto provident maiores consectetur laboriosam
          eaque, aspernatur, aut totam doloremque distinctio quaerat repudiandae! Libero fuga laudantium omnis. Ipsa
          temporibus expedita nesciunt maxime deserunt molestias repudiandae tempore libero! Dicta soluta, sapiente
          deleniti quasi nihil, animi ullam officiis, libero est fuga ipsam saepe optio!
        </p>
        <FaQuoteRight />
        <hr />
      </div>

      <div className={classes["card-tail"]}>
        <div className={classes["button-container"]}>
          <Button variant="success" className="mx-1">
            like
          </Button>
          <Button variant="danger" className="mx-1">
            dislike
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
