"use strict";

const sortingHelper = (
  sortBy,
  direction,
  validSortFields,
  sortByName = "titleName"
) => {
  const sorting = [];

  if (validSortFields.includes(sortBy)) {
    sorting.push(sortBy);
  } else {
    sorting.push(sortByName);
  }
  if (direction !== "ASC" || direction !== "DESC") {
    sorting.push("ASC");
  } else {
    sorting.push(direction);
  }

  return sorting;
};

module.exports = sortingHelper;
