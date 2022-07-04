import { useEffect, useState } from "react";

import Head from "next/head";
import { Table } from "src/components";

import styles from "./Index.module.scss";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://contactify-api.herokuapp.com/api/contacts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const table = !isLoading && data && <Table data={data} />;

  const content = isLoading ? <>Loading ...</> : table;

  return (
    <>
      <Head>
        <title>Contactify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainLayout}>{content}</div>
    </>
  );
}
