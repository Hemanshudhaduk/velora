"use client";

import { useState } from "react";
import { LinkWithOnclick } from "../atoms";

const ViewMore = props => {
  const { defaultPageSize, pageSize, clickHandler, title } = props;
  const [updatedPageSize, setUpdatedPageSize] = useState(pageSize);

  const handleClick = () => {
    clickHandler(defaultPageSize + updatedPageSize);
    setUpdatedPageSize(updatedPageSize + pageSize);
  };

  return (
    <>
      <LinkWithOnclick title={title} handleClick={handleClick} />
    </>
  );
};

export default ViewMore;
