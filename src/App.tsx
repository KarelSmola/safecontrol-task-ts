import React, { useState, useMemo, useCallback } from "react";
import { columns, data, colorsMap, colorsMap2, Column } from "./data/data";
import { IDlist } from "./components/IDlist";
import { SearchBar } from "./components/SearchBar";
import { TableHead } from "./components/TableHead";
import { Wrapper } from "./components/UI/Wrapper";

type SortConfig = {
  direction: string;
  sortBy: string;
};

export const App: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [colorMapType, setColorMapType] = useState(true);
  const [selectedCell, setSelectedCell] = useState<
    Record<string, Partial<Record<Column, boolean>>>
  >({});

  const colorMap = colorMapType ? colorsMap : colorsMap2;

  const onSearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

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
    let sortedAndFilteredItems = [...data];

    if (searchText.length) {
      sortedAndFilteredItems = sortedAndFilteredItems.filter((item) => {
        const retypedItem = item as any;
        let ret = false;

        columns.forEach((columnIdent) => {
          if (
            retypedItem[columnIdent]
              .toLowerCase()
              .trim()
              .indexOf(searchText.toLowerCase()) > -1
          ) {
            ret = true;
            return;
          }
        });

        return ret;
      });
    }

    if (sortConfig !== null) {
      const { sortBy } = sortConfig;

      sortedAndFilteredItems = sortedAndFilteredItems.sort((a, b) => {
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

    return sortedAndFilteredItems;
  }, [sortConfig, searchText]);

  const IDtoShow = useMemo(() => {
    const filteredItems =
      sortAndFilterData.filter(({ id }) => {
        if (
          selectedCell[id] &&
          Object.values(selectedCell[id]).some((value) => value)
        ) {
          return true;
        }

        return false;
      }) || [];

    return filteredItems.map(({ id }) => id).join(", ");
  }, [selectedCell, sortAndFilterData]);

  const selectCell = useCallback(
    (column: Column, itemId: string) => () => {
      setSelectedCell((state) => {
        const newState = { ...state };

        if (!newState[itemId]) {
          newState[itemId] = {};
        }
        newState[itemId] = {
          ...newState[itemId],
          [column]: !newState[itemId][column],
        };

        return newState;
      });
    },
    [],
  );

  const toggleColors = useCallback(() => {
    setColorMapType((prevState) => !prevState);
  }, []);

  return (
    <Wrapper>
      <IDlist IDtoShow={IDtoShow} />
      <SearchBar searchText={searchText} onSearchText={onSearchText} />
      <button onClick={toggleColors}>
        {colorMapType ? "Color Map 1" : "Color Map 2"}
      </button>
      {/*<button onClick={changeColorsMap}>Change colors</button>*/}
      <table className="table">
        <caption className="caption">Generated data</caption>
        <TableHead requestSort={requestSorting} />
        <tbody>
          {sortAndFilterData.map((item) => (
            <tr className="table-row" key={item.id}>
              {columns.map((column) => (
                <td
                  className="table-cell"
                  style={{
                    backgroundColor: selectedCell[item.id]?.[column]
                      ? colorMap[item.ident]
                      : "transparent",
                  }}
                  key={column}
                  onClick={selectCell(column, item.id)}
                >
                  {item[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
};
