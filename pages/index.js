import Head from "next/head";
import EventList from "../components/events/event-list";
import HeadData from "../components/head/head";
import { getFeaturedEvents } from "../helpers/api-utils";

const HomePage = ({ featuredEvents }) => {
  return (
    <div>
      <HeadData
        title={"Events"}
        description={"Find a lot of great events that allow you to evolve..."}
      />
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
