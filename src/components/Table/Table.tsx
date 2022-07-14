import React, { useCallback, useState } from "react";
import { User } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { Filters, FieldsList, ProfileCard } from "./components";
import styles from "./Table.module.scss";

interface Props {
  data: User[];
}

export function Table({ data }: Props) {
  const [currentUserId, setCurrentUserId] = useState<string>();

  const openUserCard = useCallback(
    (id: string) => () => {
      setCurrentUserId(id);
    },
    []
  );

  const rows = data.map((user) => {
    const isActiveLogo = <FontAwesomeIcon icon={user.isActive ? faEye : faEyeSlash} />;

    return (
      <tr key={user.id} onClick={openUserCard(user.id)}>
        <td className="alignLeft">
          {user.name} {user.surname.charAt(0)}.
        </td>
        <td className="alignLeft">{user.city}</td>
        <td className="alignLeft">{isActiveLogo}</td>
        <td className="alignLeft">{user.email}</td>
        <td className="alignRight">{user.phone}</td>
        <td></td>
      </tr>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Filters />
      </div>
      <div className={styles.logo}>Contactify</div>
      <div className={styles.table}>
        <table cellPadding={0}>
          <tr>
            <th className="alignLeft">
              Name <FontAwesomeIcon icon={faArrowDown} />
            </th>
            <th className="alignLeft">City</th>
            <th></th>
            <th className="alignLeft">Email</th>
            <th className="alignRight">Phone</th>
            <th className="alignRight">
              <FieldsList />
            </th>
          </tr>
          <tbody>{rows}</tbody>
        </table>
      </div>
      <div className={styles.profileCard}>
        <ProfileCard id={currentUserId} />
      </div>
    </div>
  );
}
