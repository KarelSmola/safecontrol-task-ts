import React, { useState } from "react";
import { columns, data, colorsMap } from "./data/data";
import { TableHead } from "./components/TableHead";
import { SearchBar } from "./components/SearchBar";

import { Wrapper } from "./components/UI/Wrapper";

export const App: React.FC = () => {
  const [generatedData, setGeneratedData] = useState(data);
  const [searchText, setSearchText] = useState("");

  const onSearchText = (text: string) => {
    setSearchText(text);
  };

  const selectRow = (itemId: string) => () => {
    const selectedRows = generatedData.map((item) => {
      if (item.id === itemId) {
        return { ...item, selected: !item.selected };
      } else {
        return item;
      }
    });
    setGeneratedData(selectedRows);
  };

  console.log(generatedData);

  return (
    <Wrapper>
      <SearchBar searchText={searchText} onSearchText={onSearchText} />
      <table className="table">
        <caption className="caption">Generated data</caption>
        <TableHead />
        <tbody>
          {generatedData.map((item) => (
            <tr
              className="table-row"
              style={{
                backgroundColor: item.selected
                  ? Object.values(colorsMap)[Math.floor(Math.random() * 3)]
                  : "transparent",
              }}
              key={item.id}
              onClick={selectRow(item.id)}
            >
              {columns.map((column) => {
                const retypedItemObject = item as any;
                return (
                  <td className="table-cell" key={column}>
                    {retypedItemObject[column]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
};
