import Head from "next/head";
import { Fragment } from "react";

const HeadData = ({ title, description }) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
    </Fragment>
  );
};

export default HeadData;
