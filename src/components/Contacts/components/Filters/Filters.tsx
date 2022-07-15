import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import styles from "./Filters.module.scss";

export function Filters() {
  return (
    <>
      <div className={styles.filters}>
        <input name="name" placeholder="Name" className={styles.input} />
        <select name="city" className={styles.input}>
          <option value="">City</option>
        </select>
        <input name="active" type="checkbox" className={styles.checkbox} />
        <label htmlFor="actve">Show active <FontAwesomeIcon icon={faEye} /></label>
        <button className={styles.button}>Filter</button>
      </div>
    </>
  );
}
