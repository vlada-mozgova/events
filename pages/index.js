import EventList from "../components/events/event-list/event-list";
import HeadData from "../components/head/head";
import NewsletterRegistration from "../components/input/newsletter-registration/newsletter-registration";
import { getFeaturedEvents } from "../helpers/api-utils";

const HomePage = ({ featuredEvents }) => {
  return (
    <div>
      <HeadData
        title={"Events"}
        description={"Find a lot of great events that allow you to evolve..."}
      />
      <NewsletterRegistration />
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
