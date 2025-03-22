import { getAllArticles,   getArticlesByCategory } from "../../utils/apiUtils";
import { useState, useEffect } from "react";
import "./Resources.scss";

function Resources() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("");


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let data;
        if (category) {
          data = await getArticlesByCategory(category);
        } else {
          data = await getAllArticles();
        }
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [category]);

  const handleCategoryClick = (newCategory) => {
    setCategory(newCategory);
  };

  const categories = [
    "All Categories",
    "Menstrual Health",
    "Fertility & Family Planning",
    "Pregnancy & Postpartum",
    "Nutrition & Wellness",
    "Mental Health & Stress",
    "Inclusive Health Care",
    "Hormones & Endocrine Health",
    "Chronic Health Conditions",
    "Health Checklists & Advice",
    "Innovation & Technology",
    "Social & Cultural Aspects",
  ];

  return (
    <div className="container">
      <h1>Health Resources</h1>
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-button ${
              category === cat ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(cat === "All Categories" ? "" : cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="articles-grid">
        {articles.map((article) => (
          <div key={article.title} className="article-card">
            <h2>{article.title}</h2>
            <p className="article-category">{article.category}</p>
            <p>{article.content.substring(0, 100)}...</p>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more-button"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;