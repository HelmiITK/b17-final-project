export const formatDate = (x) => {
  const dateDefault = new Date(x);
  const options = { year: "numeric", month: "long", day: "numeric" };

  return dateDefault.toLocaleDateString("id-ID", options);
};
