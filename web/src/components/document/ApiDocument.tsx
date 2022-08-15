/*
This component renders a table of api details
*/

import { FC } from "react";
import { Table } from "react-bootstrap";
import TApiDetail from "../../types/TApiDetail";
import ListGroup from "react-bootstrap/ListGroup";
import classes from "./api-document.module.css";

interface IApiDocumentProps {
  apiDetails: TApiDetail;
}
const ApiDocument: FC<IApiDocumentProps> = (props) => {
  return (
    <>
      {props.apiDetails.map((apiDetail) => {
        return (
          <details key={apiDetail._id}>
            <summary>
              <span className={classes.summary}>{apiDetail.title}</span>
            </summary>
            <div>
              <Table bordered responsive className="mt-3">
                <thead className={classes["table-header"]}>
                  <tr>
                    <th>path</th>
                    <th>method</th>
                    <th>header</th>
                    <th>body</th>
                    <th>response</th>
                  </tr>
                </thead>
                <tbody>
                  {apiDetail.details.map((detail) => {
                    return (
                      <tr key={detail._id}>
                        <td>
                          <span className="text-primary">{detail.path}</span>
                        </td>
                        <td>
                          <span className={classes["api-document-keys"]}>{detail.method}</span>
                        </td>
                        <td>{detail.header}</td>
                        <td>{detail.body}</td>
                        <td>
                          <ListGroup variant="flush">
                            {detail.responses.map((response) => {
                              return (
                                <ListGroup.Item key={response._id} style={{ backgroundColor: "#f5f5f5" }}>
                                  <span className={classes["api-document-keys"]}>data:</span>
                                  <span>{response.data},</span>
                                  <br />
                                  <span className={classes["api-document-keys"]}>status:</span>
                                  <span
                                    className={response.statusCode.startsWith("2") ? "text-success" : "text-danger"}
                                  >
                                    {response.statusCode},
                                  </span>
                                  <br />
                                  <span className={classes["api-document-keys"]}>success:</span>
                                  <span className={response.success === "true" ? "text-success" : "text-danger"}>
                                    {response.success},
                                  </span>
                                </ListGroup.Item>
                              );
                            })}
                          </ListGroup>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </details>
        );
      })}
    </>
  );
};

export default ApiDocument;
