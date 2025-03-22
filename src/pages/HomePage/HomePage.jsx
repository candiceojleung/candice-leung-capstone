import Calendar from "../../components/Calendar/Calendar";
import Intro from "../../components/Intro/Intro";

function HomePage() {
  return (
    <section className="homepage__container">
      <div className="homepage__wrapper">
        <Intro />
      </div>
      <Calendar userId={1} />
    </section>
  );
}

export default HomePage;
