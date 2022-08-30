import classes from "./event-content.module.scss";

function EventContent({ children }) {
  return <section className={classes.content}>{children}</section>;
}

export default EventContent;
