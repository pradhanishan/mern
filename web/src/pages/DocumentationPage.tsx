/*
This page contains documentation about the product for developers.
*/

import { FC } from "react";
import classes from "./documentation-page.module.css";
import ApiDocument from "../components/document/ApiDocument";
import apiDetails from "../data/api-endpoints";
import { IoMdDocument } from "react-icons/io";
const DocumentationPage: FC = () => {
  return (
    <div className={classes["documentation-page"]}>
      <div>
        <h3 className={classes["document-heading"]}>
          <IoMdDocument />
          API Documents
        </h3>
        <ApiDocument apiDetails={apiDetails} />
      </div>
    </div>
  );
};

export default DocumentationPage;
