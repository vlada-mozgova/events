import React, { Fragment, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import Notification from "../ui/notification/notification";
import MainHeader from "./main-header";

const Layout = ({ children }) => {
  const notificationCtx = useContext(NotificationContext);
  const activeNotofication = notificationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {activeNotofication && (
        <Notification
          title={activeNotofication.title}
          message={activeNotofication.message}
          status={activeNotofication.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
