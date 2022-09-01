import classes from "./comment-list.module.scss";

const CommentList = ({ items }) => {
  return (
    <ul className={classes.comments}>
      {items &&
        items.map((item) => (
          <li key={item.id}>
            <p>{item.text}</p>
            <div>
              By <address>{item.name}</address>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default CommentList;
