import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { useContacts } from "hooks";

import { Filters, FieldsList, ProfileCard } from "./components";
import styles from "./Contacts.module.scss";

export function Contacts() {
  const [visibleFields, setVisibleFields] = useState<string[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>();
  const { loading, contacts, sort, setSort } = useContacts();

  const isFieldVisible = (fieldName: string) => {
    return visibleFields.length === 0 || visibleFields.includes(fieldName);
  };

  const onFieldsListChange = useCallback(
    (newFields: string[]) => {
      setVisibleFields(newFields);
    },
    [setVisibleFields]
  );

  const openUserCard = useCallback(
    (id: string) => () => {
      setCurrentUserId(id);
    },
    [setCurrentUserId]
  );

  const thead = (
    <tr>
      {isFieldVisible("name") ? (
        <th
          className="alignLeft"
          onClick={() => {
            setSort(sort === "asc" ? "desc" : "asc");
          }}
        >
          Name <FontAwesomeIcon icon={sort === "asc" ? faArrowDown : faArrowUp} />
        </th>
      ) : null}

      {isFieldVisible("city") ? <th className="alignLeft">City</th> : null}

      <th></th>

      {isFieldVisible("email") ? <th className="alignLeft">Email</th> : null}

      {isFieldVisible("phone") ? <th className="alignRight">Phone</th> : null}

      <th className={styles.fieldListContainer}>
        <FieldsList onChange={onFieldsListChange} />
      </th>
    </tr>
  );

  let content;

  if (loading) {
    content = <>Loading...</>;
  } else if (contacts.length === 0) {
    content = <>No data</>;
  } else {
    const tobdy = contacts.map((user) => {
      const isActiveLogo = <FontAwesomeIcon icon={user.isActive ? faEye : faEyeSlash} />;

      const rowClassName = user.id === currentUserId ? styles.activeRow : "";

      return (
        <tr key={user.id} onClick={openUserCard(user.id)}>
          {isFieldVisible("name") ? (
            <td className={classNames("alignLeft", rowClassName)}>
              {user.name} {user.surname.charAt(0)}.
            </td>
          ) : null}

          {isFieldVisible("city") ? <td className={classNames("alignLeft", rowClassName)}>{user.city}</td> : null}

          <td className={classNames("alignLeft", rowClassName)}>{isActiveLogo}</td>

          {isFieldVisible("email") ? <td className={classNames("alignLeft", rowClassName)}>{user.email}</td> : null}

          {isFieldVisible("phone") ? <td className={classNames("alignRight", rowClassName)}>{user.phone}</td> : null}

          <td className={rowClassName}></td>
        </tr>
      );
    });

    content = (
      <table cellPadding={0}>
        <thead>{thead}</thead>
        <tbody>{tobdy}</tbody>
      </table>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Filters />
      </div>
      <div className={styles.logo}>Contactify</div>
      <div className={styles.table}>{content}</div>
      <div className={styles.profileCard}>
        <div className={styles.header}></div>
        <ProfileCard id={currentUserId} />
      </div>
    </div>
  );
}
