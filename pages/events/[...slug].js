import { useRouter } from "next/router";
import { Fragment } from "react";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button/button";
import { getFilteredEvents } from "../../helpers/api-utils";

const FilteredEventsPage = ({ hasError, filteredEvents, dateData }) => {
  if (hasError)
    return (
      <Fragment>
        <ErrorAlert>Invalid filter. Please adjust your values!</ErrorAlert>
        <div className="center">
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </Fragment>
    );
  console.log(filteredEvents);
  if (!filteredEvents || filteredEvents.length === 0)
    return (
      <Fragment>
        <ErrorAlert>No events found for the chosen filter</ErrorAlert>
        <div className="center">
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </Fragment>
    );

  const date = new Date(dateData.year, dateData.month - 1);
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const filteredData = params.slug;

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
    return {
      props: {
        hasError: true,
      },
    };

  const filteredEvents = await getFilteredEvents(filteredYear, filteredMonth);
  return {
    props: {
      filteredEvents: filteredEvents,
      dateData: {
        year: filteredYear,
        month: filteredMonth,
      },
    },
  };
}

export default FilteredEventsPage;
