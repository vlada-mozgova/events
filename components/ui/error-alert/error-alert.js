import classes from "./error-alert.module.scss";

const ErrorAlert = ({ children }) => {
  return <div className={classes.alert}>{children}</div>;
};

export default ErrorAlert;
