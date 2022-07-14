import React, { useCallback, useState } from "react";
import { User } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { Filters, FieldsList, ProfileCard } from "./components";
import styles from "./Table.module.scss";
import classNames from "classnames";

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
    
    const rowClassName = user.id === currentUserId ? styles.activeRow : '';
    
    return (
      <tr key={user.id} onClick={openUserCard(user.id)} >
        <td className={classNames('alignLeft', rowClassName)}>
          {user.name} {user.surname.charAt(0)}.
        </td>
        <td className={classNames('alignLeft', rowClassName)}>{user.city}</td>
        <td className={classNames('alignLeft', rowClassName)}>{isActiveLogo}</td>
        <td className={classNames('alignLeft', rowClassName)}>{user.email}</td>
        <td className={classNames('alignRight', rowClassName)}>{user.phone}</td>
        <td className={rowClassName}></td>
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
