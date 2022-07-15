import React, { useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useContacts } from "hooks";

import styles from "./Filters.module.scss";

type ValueChangeKey = "name" | "city" | "isActive";

export function Filters() {
  const { cities, filter, setFilterValue, filterContacts } = useContacts();

  const onValueChange = useCallback(
    (key: ValueChangeKey) => (event) => {
      let value;

      if (event.target.type === "checkbox") {
        value = event.target.checked;
      } else {
        value = event.target.value;
      }

      setFilterValue(key, value);
    },
    [setFilterValue]
  );

  const citySelectOptions = useMemo(() => {
    return cities.map((city) => {
      return <option value={city} key={city}>{city}</option>
    });
  }, [cities]);

  return (
    <>
      <div className={styles.filters}>
        <input
          name="name"
          placeholder="Name"
          className={styles.input}
          value={filter.name}
          onChange={onValueChange("name")}
        />
        <select name="city" className={styles.input} value={filter.city} onChange={onValueChange("city")}>
          <option key="empty" value="">City</option>
          {citySelectOptions}
        </select>
        <input
          name="active"
          type="checkbox"
          className={styles.checkbox}
          checked={filter.isActive}
          onChange={onValueChange("isActive")}
        />
        <label htmlFor="actve">
          Show active <FontAwesomeIcon icon={faEye} />
        </label>
        <button className={styles.button} onClick={filterContacts}>Filter</button>
      </div>
    </>
  );
}
