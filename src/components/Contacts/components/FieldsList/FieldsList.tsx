import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import styles from "./FieldsList.module.scss";

interface Props {
  onChange: (fieldsList: string[]) => void;
}

export function FieldsList({onChange}: Props) {
  const [selectedFields, setSelectedFields] =  useState([]);
  const [listOpened, setListOpened] = useState(false);

  const toggleList = useCallback(() => {
    setListOpened(!listOpened);
  }, [setListOpened, listOpened]);

  const onFieldSelectionChange = useCallback((fieldName: string) => (event) => {
    const newSelectedFields = [...selectedFields];
    
    if (newSelectedFields.includes(fieldName)) {
      const index = newSelectedFields.indexOf(fieldName);
      if (index !== -1) {
        newSelectedFields.splice(index, 1);
      } 
    } else {
      newSelectedFields.push(fieldName);
    }

    onChange && onChange(newSelectedFields);
    setSelectedFields(newSelectedFields);
  }, [selectedFields, setSelectedFields]);

  const logoClasses = [styles.logo];

  if (listOpened) {
    logoClasses.push(styles.logoActive);
  }

  const list = listOpened && (
    <div className={styles.list}>
      <div className={styles.row}>
        <input type="checkbox" name="name" onChange={onFieldSelectionChange('name')}/>
        <label htmlFor="name">Name</label>
      </div>
      <div className={styles.row}>
        <input type="checkbox" name="city" onChange={onFieldSelectionChange('city')}/>
        <label htmlFor="city">City</label>
      </div>
      <div className={styles.row}>
        <input type="checkbox" name="email" onChange={onFieldSelectionChange('email')}/>
        <label htmlFor="email">Email</label>
      </div>
      <div className={styles.row}>
        <input type="checkbox" name="phone" onChange={onFieldSelectionChange('phone')}/>
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
