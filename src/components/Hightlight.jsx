import React from "react";

export const Hightlight = ({ filter, str }) => {
  if (!filter) return str;
  const regexp = new RegExp(filter, "ig");
  const matchValue = str.match(regexp);
  if (matchValue) {
    return str.split(regexp).map((s, index, array) => {
      if (index < array.length - 1) {
        const c = matchValue.shift();
        return (
          <div key={index}>
            {s}
            <span className="hightlight">{c}</span>
          </div>
        );
      }
      return s;
    });
  }
  return str;
};
