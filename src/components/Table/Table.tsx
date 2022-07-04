import React from "react";
import { User } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faArrowDown, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import styles from "./Table.module.scss";

interface Props {
  data: User[];
}

export function Table({ data }: Props) {
  console.log(data);

  const rows = data.map((user) => {
    const isActiveLogo = <FontAwesomeIcon icon={user.isActive ? faEye : faEyeSlash} />;

    return (
      <tr key={user.id}>
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
      <div className={styles.filters}>Name</div>
      <div className={styles.logo}>Contactify</div>
      <div className={styles.table}>
        <table>
          <tr>
            <th className="alignLeft">
              Name <FontAwesomeIcon icon={faArrowDown} />
            </th>
            <th className="alignLeft">City</th>
            <th></th>
            <th className="alignLeft">Email</th>
            <th className="alignRight">Phone</th>
            <th className="alignRight">
              <FontAwesomeIcon icon={faList} />{" "}
            </th>
          </tr>
          <tbody>{rows}</tbody>
        </table>
      </div>
      <div className={styles.profileCard}></div>
    </div>
  );
}
