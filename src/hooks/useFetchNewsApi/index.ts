import axios from "axios";
import {useEffect, useState} from "react";
import {requestNewsApi} from "./request";

const useFetchNewsApi = () => {
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNewsApi = async () => {
      setIsApiLoading(true);
      try {
        const payload = {
          country: "us",
          language: "en",
          pageSize: "3",
          category: "technology",
        };
        const response = await requestNewsApi(payload);

        setArticles(response.data.articles);
        setIsApiLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNewsApi();
  }, []);

  return {articles, isApiLoading};
};

export default useFetchNewsApi;
