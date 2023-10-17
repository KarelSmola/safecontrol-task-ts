import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns, data, colorsMap, colorsMap2 } from "./data/data";

import { IDlist } from "./components/IDlist";
import { SearchBar } from "./components/SearchBar";
import { TableHead } from "./components/TableHead";
import { Wrapper } from "./components/UI/Wrapper";

import { selectCell, toggleColorMap } from "./features/itemSlice";

export const App = () => {
  const dispatch = useDispatch();

  const { sortBy, direction, selectedCells, searchText, colorMapType } =
    useSelector((store: any) => store.item) as any;

  const colorMap = colorMapType ? colorsMap : colorsMap2;

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

    if (sortBy !== null) {
      sortedAndFilteredItems = sortedAndFilteredItems.sort((a, b) => {
        const retypedObject_a = a as any;
        const retypedObject_b = b as any;

        if (retypedObject_a[sortBy] < retypedObject_b[sortBy]) {
          return direction ? -1 : 1;
        }

        if (retypedObject_a[sortBy] > retypedObject_b[sortBy]) {
          return !direction ? -1 : 1;
        }

        return 0;
      });
    }

    return sortedAndFilteredItems;
  }, [searchText, sortBy, direction]);

  const IDtoShow = useMemo(() => {
    const filteredItems =
      sortAndFilterData.filter(({ id }) => {
        if (
          selectedCells[id] &&
          Object.values(selectedCells[id]).some((value) => value)
        ) {
          return true;
        }

        return false;
      }) || [];

    return filteredItems.map(({ id }) => id).join(", ");
  }, [selectedCells, sortAndFilterData]);

  const toggleColors = useCallback(() => {
    dispatch(toggleColorMap());
  }, [dispatch]);

  return (
    <Wrapper>
      <IDlist IDtoShow={IDtoShow} />
      <SearchBar />
      <button onClick={toggleColors}>
        {colorMapType ? "Color Map 1" : "Color Map 2"}
      </button>
      <table className="table">
        <caption className="caption">Generated data</caption>
        <TableHead />
        <tbody>
          {sortAndFilterData.map((item) => (
            <tr className="table-row" key={item.id}>
              {columns.map((column) => (
                <td
                  className="table-cell"
                  style={{
                    backgroundColor: selectedCells[item.id]?.[column]
                      ? colorMap[item.ident]
                      : "transparent",
                  }}
                  key={column}
                  onClick={() => {
                    dispatch(selectCell(item.id, column));
                  }}
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
