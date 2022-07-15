import React, { useEffect, useState } from "react";
import { User } from "types";
import Image from "next/image";

import styles from "./ProfileCard.module.scss";
import userPic from "./images/userpic.jpg";

interface Props {
  id: string;
}

export function ProfileCard({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setLoading(true);

    if (id) {
      fetch(`https://contactify-api.herokuapp.com/api/contacts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        });
    }
  }, [id, setLoading, setUser]);

  if (!user) {
    return <>No user</>;
  }

  if (loading) {
    return <>Loading ...</>;
  }

  return (
    <div className={styles.profileCard}>
      <img src={userPic.src} className={styles.avatar} />
      <div className={styles.row}>
        <div className={styles.label}>Name:</div>
        <div className={styles.info}>{user.name}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>City:</div>
        <div className={styles.info}>{user.city}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Email:</div>
        <div className={styles.info}>{user.email}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Phone:</div>
        <div className={styles.info}>{user.phone}</div>
      </div>
    </div>
  );
}
