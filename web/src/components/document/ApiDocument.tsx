/*
This component renders a table of api details
*/

import { FC } from "react";
import { Table } from "react-bootstrap";

import TApiDetail from "../../types/TApiDetail";
import ListGroup from "react-bootstrap/ListGroup";

interface IApiDocumentProps {
  apiDetails: TApiDetail;
}
const ApiDocument: FC<IApiDocumentProps> = (props) => {
  return (
    <>
      {props.apiDetails.map((apiDetail) => {
        return (
          <div key={apiDetail._id}>
            <h3>{apiDetail.title}</h3>
            <Table bordered responsive>
              <thead>
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
                      <td>{detail.path}</td>
                      <td>{detail.method}</td>
                      <td>{detail.header}</td>
                      <td>
                        <ListGroup variant="flush">
                          {detail.body.map((body) => {
                            return (
                              <ListGroup.Item
                                style={{ backgroundColor: "#f5f5f5" }}
                                key={body._id}
                              >{`{${body.key} : ${body.type}   }`}</ListGroup.Item>
                            );
                          })}
                        </ListGroup>
                      </td>
                      <td>
                        <ListGroup variant="flush">
                          {detail.responses.map((response) => {
                            return (
                              <ListGroup.Item
                                key={response._id}
                                style={{ backgroundColor: "#f5f5f5" }}
                              >{` data : ${response.data}, statusCode: ${response.statusCode}, errors:${response.errors}, 
                            success : ${response.success}`}</ListGroup.Item>
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
        );
      })}
    </>
  );
};

export default ApiDocument;
