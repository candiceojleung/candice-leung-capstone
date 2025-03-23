import Calendar from "../../components/Calendar/Calendar";
import Intro from "../../components/Intro/Intro";

function HomePage() {
  return (
    <section className="homepage__container">
      <div className="homepage__wrapper">
        <Intro userId={1} />
      </div>
      <div className="homepage__item">
        <Calendar userId={1} />
      </div>
    </section>
  );
}

export default HomePage;
