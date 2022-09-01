import { Fragment } from "react";
import EventContent from "../../components/event-detail/event-content/event-content";
import EventLogistics from "../../components/event-detail/event-logistics/event-logistics";
import EventSummary from "../../components/event-detail/event-summary/event-summary";
import HeadData from "../../components/head/head";
import Comments from "../../components/input/comments/comments";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";

const EventDetailPage = ({ event }) => {
  if (!event) {
    return (
      <Fragment>
        <HeadData title={"Loading..."} description={"Loading page."} />
        <div className="center">
          <p>Loading...</p>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <HeadData title={event.title} description={event.description} />
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const event = await getEventById(context.params.eventId);

  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventDetailPage;
