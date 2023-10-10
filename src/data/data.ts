enum Ident {
  Un = 'un',
  Deux = 'deux',
  Trois = 'trois'
}

export enum Column {
  Id = 'id',
  Title = 'title',
  Description = 'description'
}


const colorIdents = [
  {
    ident: Ident.Un,
    props: {
      color: "red",
    },
  },
  {
    ident: Ident.Deux,
    props: {
      color: "green",
    },
  },
  {
    ident: Ident.Trois,
    props: {
      color: "blue",
    },
  },
];

const colorIdents2 = [
  {
    ident: Ident.Un,
    props: {
      color: "orangered",
    },
  },
  {
    ident: Ident.Deux,
    props: {
      color: "yellow",
    },
  },
  {
    ident: Ident.Trois,
    props: {
      color: "pink",
    },
  },
];

export const columns = [Column.Id, Column.Title, Column.Description] as const;


type Data = Array<Record<Column, string> & {
  ident: Ident
}>;

export const data: Data = Array.from({ length: 10 }, (_, i) => {
  const idents = Object.values(Ident)

  return {
    [Column.Id]: crypto.randomUUID(),
    [Column.Title]: `${Math.floor(Math.random() * 999)} title`,
    [Column.Description]: `${Math.floor(Math.random() * 999)} description`,
    ident: idents[Math.floor(Math.random()*(idents.length))]
  };
});

export type CustomMap = Partial<Record<Ident, string>>

export const colorsMap: CustomMap = {};

colorIdents.forEach((el) => {
  colorsMap[el.ident] = el.props.color;
});

export const colorsMap2: CustomMap = {};

colorIdents2.forEach((el) => {
  colorsMap2[el.ident] = el.props.color;
});
