import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import styles from "./FieldsList.module.scss";

export function FieldsList() {
  const [listOpened, setListOpened] = useState(false);

  const toggleList = useCallback(() => {
    setListOpened(!listOpened);
  }, [setListOpened, listOpened]);

  const logoClasses = [styles.logo];

  if (listOpened) {
    logoClasses.push(styles.logoActive);
  }

  const list = listOpened && (
    <div className={styles.list}>
      <div className={styles.row}>
        <input type="checkbox" name="name" />
        <label htmlFor="name">Name</label>
      </div>
      <div className={styles.row}>
        <input type="checkbox" name="city" />
        <label htmlFor="city">City</label>
      </div>
      <div className={styles.row}>
        <input type="checkbox" name="email" />
        <label htmlFor="email">Email</label>
      </div>
      <div className={styles.row}>
        <input type="checkbox" name="phone" />
        <label htmlFor="phone">Phone</label>
      </div>
    </div>
  );

  return (
    <div className={styles.fieldsList}>
      <div className={classNames(logoClasses)} onClick={toggleList}>
        <FontAwesomeIcon icon={faList} />
      </div>
      {list}
    </div>
  );
}
