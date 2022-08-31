import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-utils";

const AllEventsPage = ({ events }) => {
  const router = useRouter();

  const findEventsHandler = (year, month) =>
    router.push(`/events/${year}/${month}`);

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};
export async function getStaticProps(context) {
  const eventsData = await getAllEvents();
  return {
    props: {
      events: eventsData,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
