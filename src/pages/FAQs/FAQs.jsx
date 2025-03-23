import "./FAQs.scss";
import { useState } from "react";

const FAQs = () => {
  const [expandedSection, setExpandedSection] = useState({});

  const faqs = [
    {
      question: "What is periodic.ally?",
      answer:
        "periodic.ally is a period tracking application designed to help you monitor your menstrual cycle, track symptoms, and stay informed about your reproductive health.",
    },
    {
      question: "How does periodic.ally work?",
      answer:
        "Simply log any symptoms you have each day, whether you have your period or not, and the app will help you track your cycle while hleping you identify patterns in your symptoms.",
    },
    {
      question: "Why periodic.ally?",
      answer:
        "Misdiagnosis in female health, particularly in reproductive conditions, is a significant issue. Historical biases in medical education have led to gaps in understanding specific conditions, resulting in overlooked or misattributed symptoms. Our application aims to empower users to better communicate their experiences to healthcare providers.",
    },
    {
      question: "How do I log my period?",
      answer:
        "Simply select the day you'd like to generate your log for and fill out the form. You can select as many or as little symptoms for the day. Feel free update or delete your log for the day too. ",
    },
    {
      question: "Can I track symptoms?",
      answer:
        "Yes, you can log physical and emotional symptoms like cramps, mood swings, and bloating to better understand your cycle. The colored icons under the date highlight whether you have your menstrual cycle, experienced any physical symptoms and your mental health condition. ",
    },
    {
      question: "Does the app integrate with other health apps?",
      answer:
        "Currently, we do not integrate with other health apps, but we are working on adding this feature in future updates.",
    },
    {
      question: "Can I share my data with my healthcare provider?",
      answer:
        "Yes, absolutely! The purpose of this app is to show your healthcare practioner the frequency of your symptoms and whether they make sense for where you are in your menstrual cycle. ",
    },
    {
      question: "How do I contact your support team?",
      answer:
        "You can contact us via email at support@periodic.ally.com or through the other channels listed at the bottom of our page.",
    },
  ];
  const toggleSection = (question) => {
    setExpandedSection((prevSections) => ({
      ...prevSections,
      [question]: !prevSections[question],
    }));
  };
  return (
    <section className="faqs">
      <h2 className="faqs__title">Frequently Asked Questions</h2>
      <div className="faqs__list">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className={`faqs__item ${
              expandedSection[faq.question] ? "faqs__item--expanded" : ""
            }`}
          >
            <div
              className="faqs__question-container"
              onClick={() => toggleSection(faq.question)}
            >
              <i
                className={`bx ${
                  expandedSection[faq.question] ? "bx-minus" : "bx-plus"
                } faqs__icon`}
              ></i>
              <h3 className="faqs__question">{faq.question}</h3>
            </div>
            {expandedSection[faq.question] && (
              <p className="faqs__answer">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
