import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import EventList from "../../components/events/event-list/event-list";
import ResultsTitle from "../../components/ui/results-title/results-title";
import HeadData from "../../components/head/head";
import Button from "../../components/ui/button/button";
import ErrorAlert from "../../components/ui/error-alert/error-alert";

const FilteredEventsPage = () => {
  const router = useRouter();
  const filteredData = router.query.slug;

  const [loadedEvents, setLoadedEvents] = useState();

  const { data, error } = useSWR(
    "https://nexjs-course-8a219-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return (
      <Fragment>
        <HeadData title={"Loading..."} description={"Loading page."} />
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  const filteredYear = +filteredData[0];
  const filteredMonth = +filteredData[1];

  if (
    Number.isNaN(filteredYear) ||
    Number.isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12 ||
    error
  )
    return (
      <Fragment>
        <HeadData
          title={"Invalid filter"}
          description={"Invalid filter. Please adjust your values!"}
        />
        <ErrorAlert>Invalid filter. Please adjust your values!</ErrorAlert>
        <div className="center">
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </Fragment>
    );

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0)
    return (
      <Fragment>
        <HeadData
          title={"No eventsr"}
          description={"No events found for the chosen filter"}
        />
        <ErrorAlert>No events found for the chosen filter</ErrorAlert>
        <div className="center">
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </Fragment>
    );

  const date = new Date(filteredYear, filteredMonth - 1);
  return (
    <Fragment>
      <HeadData
        title={"Filtered events"}
        description={`Events in ${filteredMonth}/${filteredYear}`}
      />
      <div>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
      </div>
    </Fragment>
  );
};

export default FilteredEventsPage;
