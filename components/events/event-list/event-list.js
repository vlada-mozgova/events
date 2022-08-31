import EventItem from "../event-item/event-item";
import classes from "./event-list.module.scss";

const EventList = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          date={event.date}
          location={event.location}
          title={event.title}
          image={event.image}
        />
      ))}
    </ul>
  );
};

export default EventList;
