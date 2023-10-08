import React, { useMemo, useState } from "react";
import { columns, data, colorsMap } from "./data/data";
import { TableHead } from "./components/TableHead";
import { SearchBar } from "./components/SearchBar";

import { Wrapper } from "./components/UI/Wrapper";

export const App: React.FC = () => {
  type SortConfig = {
    direction: string;
    sortBy: string;
  };

  const [generatedData, setGeneratedData] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

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

  const reguestSorting: (sortBy: string) => void = (sortBy) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.sortBy === sortBy &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ direction, sortBy });
  };

  const sortAndFilterData = useMemo(() => {
    let sortedAndFilteredItems = [...generatedData];

    if (sortConfig !== null) {
      const { sortBy } = sortConfig;

      sortedAndFilteredItems.sort((a, b) => {
        const retypedObject_a = a as any;
        const retypedObject_b = b as any;

        if (retypedObject_a[sortBy] < retypedObject_b[sortBy]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }

        if (retypedObject_a[sortBy] > retypedObject_b[sortBy]) {
          return sortConfig.direction === "descending" ? -1 : 1;
        }

        return 0;
      });
    }

    if (searchText.length) {
      sortedAndFilteredItems = generatedData.filter((item) => {
        return item.title.toLowerCase().startsWith(searchText.toLowerCase());
      });
    }

    return sortedAndFilteredItems;
  }, [sortConfig, searchText, generatedData]);

  return (
    <Wrapper>
      <SearchBar searchText={searchText} onSearchText={onSearchText} />
      <table className="table">
        <caption className="caption">Generated data</caption>
        <TableHead reguestSort={reguestSorting} />
        <tbody>
          {sortAndFilterData.map((item) => (
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
