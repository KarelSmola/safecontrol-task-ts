export const columns: string[] = ["id", "title", "description"];

export const data = Array.from({ length: 10 }, (_, i) => {
  return {
    id: crypto.randomUUID(),
    title: `${Math.floor(Math.random() * 999)} title`,
    description: `${Math.floor(Math.random() * 999)} description`,
  };
});
