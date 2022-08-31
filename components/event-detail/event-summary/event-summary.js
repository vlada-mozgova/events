import classes from "./event-summary.module.scss";

function EventSummary({ title }) {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;
