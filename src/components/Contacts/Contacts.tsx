import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { useContacts } from "hooks";

import { Filters, FieldsList, ProfileCard } from "./components";
import styles from "./Contacts.module.scss";

export function Contacts() {
  const [currentUserId, setCurrentUserId] = useState<string>();
  const { loading, contacts, sort, setSort } = useContacts();

  const openUserCard = useCallback(
    (id: string) => () => {
      setCurrentUserId(id);
    },
    [setCurrentUserId]
  );

  let content;

  if (loading) {
    content = <>Loading...</>;
  } else if (contacts.length === 0) {
    content = <>No data</>;
  } else {
    const rows = contacts.map((user) => {
      const isActiveLogo = <FontAwesomeIcon icon={user.isActive ? faEye : faEyeSlash} />;

      const rowClassName = user.id === currentUserId ? styles.activeRow : "";

      return (
        <tr key={user.id} onClick={openUserCard(user.id)}>
          <td className={classNames("alignLeft", rowClassName)}>
            {user.name} {user.surname.charAt(0)}.
          </td>
          <td className={classNames("alignLeft", rowClassName)}>{user.city}</td>
          <td className={classNames("alignLeft", rowClassName)}>{isActiveLogo}</td>
          <td className={classNames("alignLeft", rowClassName)}>{user.email}</td>
          <td className={classNames("alignRight", rowClassName)}>{user.phone}</td>
          <td className={rowClassName}></td>
        </tr>
      );
    });

    content = (
      <table cellPadding={0}>
        <tr>
          <th
            className="alignLeft"
            onClick={() => {
              setSort(sort === "asc" ? "desc" : "asc");
            }}
          >
            Name <FontAwesomeIcon icon={sort === "asc" ? faArrowDown : faArrowUp} />
          </th>
          <th className="alignLeft">City</th>
          <th></th>
          <th className="alignLeft">Email</th>
          <th className="alignRight">Phone</th>
          <th className={styles.fieldListContainer}>
            <FieldsList />
          </th>
        </tr>
        <tbody>{rows}</tbody>
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
