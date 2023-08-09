import React, { ChangeEvent } from 'react';

interface ISelect {
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  componentName: string;
  selected: string;
}

export default function Select({ handleSelectChange, componentName, selected }: ISelect) {
  return (
    <select
      className="w-full p-2 my-1 border border-blue-light rounded-lg focus:ring-blue-primary focus:ring-2 focus:outline-none text-blue-secondary text-lg"
      onChange={handleSelectChange}
      id={componentName}
      defaultValue={selected}
    >
      <option> option 1 </option>
      {/* {name === 'search' && <option>All</option>}
      {categories.map((category, index) => (
        <option key={index}>{category}</option>
      ))} */}
    </select>
  );
}
