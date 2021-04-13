import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');

const formatSpots = (spots) => {
  if (!spots) {
    return 'no spots remaining';
  }
  if (spots === 1) {
    return '1 spot remaining';
  }
  return `${spots} spots remaining`;
}

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const DayListItemClass = classNames(
    'day-list__item',
    { 'day-list__item--selected': selected },
    { 'day-list__item--full': !spots }
  );
  return (
    <li className={DayListItemClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}