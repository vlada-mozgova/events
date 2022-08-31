import Link from "next/link";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";

const HomePage = ({ featuredEvents }) => {
  // const featuredEvents = getFeaturedEvents();

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
  };
}

export default HomePage;
