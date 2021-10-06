export const processCategories = (categories) => {
  return categories.map((category) => ({
    where: {
      name: category.toLowerCase(),
    },
    create: {
      name: category.toLowerCase(),
      slug: category.toLowerCase().replace(/ /g, "_"),
    },
  }));
};
