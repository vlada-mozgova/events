import { useContext, useRef } from "react";
import NotificationContext from "../../../store/notification-context";
import classes from "./newsletter-registration.module.scss";

const NewsletterRegistration = () => {
  const notificationCtx = useContext(NotificationContext);

  const emailRef = useRef();
  const registrationHandler = (event) => {
    event.preventDefault();

    notificationCtx.showNotofication({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: emailRef.current.value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong.");
        });
      })
      .then((data) =>
        notificationCtx.showNotofication({
          title: "Success!",
          message: "Successfully registered for newsletter.",
          status: "success",
        })
      )
      .catch((error) =>
        notificationCtx.showNotofication({
          title: "Error!",
          message: error.message || "Something went wrong.",
          status: "error",
        })
      );
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
