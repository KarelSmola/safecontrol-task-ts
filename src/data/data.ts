const colorIdents = [
  {
    ident: "un",
    props: {
      color: "red",
    },
  },
  {
    ident: "deux",
    props: {
      color: "green",
    },
  },
  {
    ident: "trois",
    props: {
      color: "blue",
    },
  },
];

type CustomColumns = string[];
export const columns: CustomColumns = ["id", "title", "description"];

type Data = {
  id: string;
  title: string;
  description: string;
  selected: boolean;
}[];

export const data: Data = Array.from({ length: 10 }, (_, i) => {
  return {
    id: crypto.randomUUID(),
    title: `${Math.floor(Math.random() * 999)} title`,
    description: `${Math.floor(Math.random() * 999)} description`,
    selected: false,
  };
});

interface CustomMap {
  [key: string]: any;
}

export const colorsMap: CustomMap = {};

colorIdents.forEach((el) => {
  colorsMap[el.ident] = el.props.color;
});

console.log(Object.values(colorsMap)[Math.floor(Math.random() * 3)]);
