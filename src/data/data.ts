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

const colorIdents2 = [
  {
    ident: "un",
    props: {
      color: "orangered",
    },
  },
  {
    ident: "deux",
    props: {
      color: "yellow",
    },
  },
  {
    ident: "trois",
    props: {
      color: "pink",
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

export const colorsMap2: CustomMap = {};

colorIdents2.forEach((el) => {
  colorsMap2[el.ident] = el.props.color;
});
