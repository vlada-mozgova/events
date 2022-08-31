import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";

const HomePage = ({ featuredEvents }) => {
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export async function getStaticProps(context) {
  const data = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: data,
    },
    revalidate: 1800,
  };
}

export default HomePage;
