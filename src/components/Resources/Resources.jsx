import { getAllArticles, getArticlesByCategory } from "../../utils/apiUtils";
import { useState, useEffect } from "react";
import "./Resources.scss";

function Resources() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const backgroundClasses = ["bg1", "bg2", "bg3"];

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
      <h2 className="resources__heading">Resources</h2>
      <div className="resources__buttons">
        {categories.map((topic) => (
          <button
            key={topic}
            className={`resources__button ${
              category === topic ? "resources__button--active" : ""
            }`}
            onClick={() => handleCategoryClick(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
      <div className="resources__articles">
        {articles.map((article) => (
          <a
            key={article.title}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`resources__article resources__article--${
              backgroundClasses[
                Math.floor(Math.random() * backgroundClasses.length)
              ]
            }`}
          >
            <div className="resources__action">
              <h3 className="resources__title">{article.title}</h3>
              <span className="resources__arrow">
                <i className="bx bx-right-arrow-alt"></i>
              </span>
            </div>
            <p className="resources__category">{article.category}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Resources;
