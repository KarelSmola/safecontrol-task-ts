import React, { useState } from "react";
import { columns, data } from "./data/data";
import { TableHead } from "./components/TableHead";
import { SearchBar } from "./components/SearchBar";

import { Wrapper } from "./components/UI/Wrapper";

export const App: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  type Data = { id: string; title: string; description: string }[];
  const generatedData: Data = data;

  const onSearchText = (text: string) => {
    setSearchText(text);
  };

  return (
    <Wrapper>
      <SearchBar searchText={searchText} onSearchText={onSearchText} />
      <table className="table">
        <caption className="caption">Generated data</caption>
        <TableHead />
        <tbody>
          {generatedData.map((item) => (
            <tr className="table-row" key={item.id}>
              {columns.map((column: string) => (
                <td key={column}>{item[column]}</td>
                // <td className="table-cell" key={column}>
                //   {column}
                // </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
};
