/*
This page contains documentation about the product for developers.
*/

import { FC } from "react";
import classes from "./documentation-page.module.css";
import ApiDocument from "../components/document/ApiDocument";
import apiDetails from "../data/api-endpoints";
const DocumentationPage: FC = () => {
  return (
    <div className={classes["documentation-page"]}>
      <ApiDocument apiDetails={apiDetails} />
    </div>
  );
};

export default DocumentationPage;
