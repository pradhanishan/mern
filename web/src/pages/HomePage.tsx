import { FC, useEffect, useState } from "react";
import classes from "./home-page.module.css";
import Card from "../components/ui/Card";
import Add from "../components/ui/Add";
import { useAppSelector } from "../hooks/useAppSelector";
import applicationConfig from "../config/application-config";
import get from "../utilities/api/get";

const HomePage: FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const [quotes, setQuotes] = useState<
    { _id: string; author: string; quote: string; likes: number; dislikes: number }[]
  >([]);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      return;
    }
    const getQuotes = async () => {
      const responseData = await get(`${applicationConfig.serverUrl}/quotes`);
      if (!responseData.success) {
        return;
      }
      setQuotes(responseData.data);
    };
    getQuotes();
  }, []);

  return (
    <>
      {auth.isLoggedIn && (
        <div className={classes["logged-in-data"]}>
          <Add />
          {quotes.length > 0 &&
            quotes.map((quote) => {
              return (
                <Card
                  key={quote._id}
                  author={quote.author}
                  quote={quote.quote}
                  likes={quote.likes}
                  dislikes={quote.dislikes}
                  _id={quote._id}
                />
              );
            })}
        </div>
      )}
      <div></div>
    </>
  );
};

export default HomePage;
