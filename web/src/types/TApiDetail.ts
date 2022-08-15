// Type of your API detail document

type TApiDetail = {
  _id: string;
  title: string;
  details: {
    _id: string;
    path: string;
    method: string;
    header: string;
    responses: {
      _id: string;
      data: string;
      errors: string;
      statusCode: string;
      success: string;
    }[];
    body: string;
  }[];
}[];

export default TApiDetail;
