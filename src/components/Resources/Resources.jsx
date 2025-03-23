import { getAllArticles, getArticlesByCategory } from "../../utils/apiUtils";
import { useState, useEffect } from "react";
import "./Resources.scss";

function Resources() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getAllArticles();
        setArticles(data);

        const uniqueCategories = [
          "All Categories",
          ...new Set(data.map((article) => article.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const filterArticles = async () => {
      if (category && category !== "All Categories") {
        const filteredData = await getArticlesByCategory(category);
        setArticles(filteredData);
      } else {
        const allData = await getAllArticles();
        setArticles(allData);
      }
    };

    filterArticles();
  }, [category]);

  const handleCategoryClick = (newCategory) => {
    setCategory(newCategory === "All Categories" ? "" : newCategory);
  };

  return (
    <section className="resources">
      <h1 className="resources__heading">Learn More</h1>
      <div className="resources__buttons">
        {categories.map((topic) => (
          <button
            key={topic}
            className={`resources__button ${category === topic ? " resources__button --active" : ""}`}
            onClick={() => handleCategoryClick(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
      <div className="resources__articles">
        {articles.map((article) => (
          <div key={article.title} className="resources__article">
            <h2 className="resources__title">{article.title}</h2>
            <p className="resources__category">{article.category}</p>
            <p className="resources__content">{article.content}</p>
            <div className="resources__action">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="resources__read"
            >
              Read More
            </a>
          </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Resources;
