"use client";

import _ from "lodash";

const Scroller = props => {
  const { redirectId, children } = props;

  const handleLinkClick = e => {
    const targetElement = document.getElementById(redirectId);
    const previousElement = document.getElementsByClassName("cm-gosec-active");
    if (previousElement?.length > 0) {
      _.forEach(previousElement, element => {
        element.classList.remove("cm-gosec-active");
      });
    }
    const offset = 100; // Set your desired offset value
    e.target.classList.add("cm-gosec-active");

    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="cm-gosec" onClick={handleLinkClick} style={{ cursor: "pointer" }}>
      {children}
    </div>
  );
};

export default Scroller;
