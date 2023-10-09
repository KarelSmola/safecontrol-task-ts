import React, { useState, useMemo, useCallback } from "react";
import { columns, data, colorsMap, colorsMap2 } from "./data/data";
import { IDlist } from "./components/IDlist";
import { SearchBar } from "./components/SearchBar";
import { TableHead } from "./components/TableHead";
import { Wrapper } from "./components/UI/Wrapper";

type SortConfig = {
  direction: string;
  sortBy: string;
};

export const App: React.FC = () => {
  const [generatedData, setGeneratedData] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [colorMap, setColorMap] = useState(true);

  const IDtoShow = generatedData
    .filter((item) => item.selected)
    .map((item) => item.id)
    .join(", ");

  const onSearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const selectRow =
    (selectedItem: {
      id: string;
      title: string;
      description: string;
      selected: boolean;
    }) =>
    () => {
      const selectedRows = generatedData.map((curItem) => {
        if (curItem.id === selectedItem.id) {
          return !curItem.selected
            ? { ...curItem, selected: true }
            : { ...curItem, selected: false };
        } else {
          return curItem;
        }
      });
      setGeneratedData(selectedRows);
    };

  const requestSorting: (sortBy: string) => void = useCallback(
    (sortBy) => {
      let direction = "ascending";
      if (
        sortConfig &&
        sortConfig.sortBy === sortBy &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }

      setSortConfig({ direction, sortBy });
    },
    [sortConfig],
  );

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

  const toggleColors = useCallback(() => {
    setColorMap((prevState) => !prevState);
  }, []);

  // const changeColorsMap = () => {
  //   const newColors: string[] = ["orangered", "pink", "navy"];
  //
  //   let colorsObj: {} = colorsMap;
  //   let retypedColorsObj = colorsObj as any;
  //
  //   Object.keys(colorsObj).forEach((item) => {
  //     retypedColorsObj[item] = newColors[Math.floor(Math.random() * 3)];
  //   });
  //
  //   return colorMap
  //     ? `${Object.values(colorsMap)[Math.floor(Math.random() * 3)]}`
  //     : `${Object.values(colorsMap2)[Math.floor(Math.random() * 3)]}`;
  // };

  const colors = colorMap
    ? `${Object.values(colorsMap)[Math.floor(Math.random() * 3)]}`
    : `${Object.values(colorsMap2)[Math.floor(Math.random() * 3)]}`;

  return (
    <Wrapper>
      <IDlist IDtoShow={IDtoShow} />
      <SearchBar searchText={searchText} onSearchText={onSearchText} />
      <button onClick={toggleColors}>
        {colorMap ? "Color Map 1" : "Color Map 2"}
      </button>
      {/*<button onClick={changeColorsMap}>Change colors</button>*/}
      <table className="table">
        <caption className="caption">Generated data</caption>
        <TableHead requestSort={requestSorting} />
        <tbody>
          {sortAndFilterData.map((item) => (
            <tr
              className="table-row"
              style={{
                backgroundColor: item.selected ? colors : "transparent",
              }}
              key={item.id}
              onClick={selectRow(item)}
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
