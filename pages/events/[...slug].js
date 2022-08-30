import { useRouter } from "next/router";
import { Fragment } from "react";
import ErrorAlert from "../../components/events/error-alert";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import { getFilteredEvents } from "../../dummy-data";

const FilteredEventsPage = () => {
  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = +filteredData[0];
  const filteredMonth = +filteredData[1];

  if (
    Number.isNaN(filteredYear) ||
    Number.isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  )
    return (
      <Fragment>
        <ErrorAlert>Invalid filter. Please adjust your values!</ErrorAlert>
        <div className="center">
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </Fragment>
    );

  const filteredEvents = getFilteredEvents(filteredYear, filteredMonth);

  if (!filteredEvents || filteredEvents.length === 0)
    return (
      <Fragment>
        <ErrorAlert>No events found for the chosen filter</ErrorAlert>
        <div className="center">
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </Fragment>
    );

  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
};

export default FilteredEventsPage;
