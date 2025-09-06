export const getPagination = (
  currentPage: number,
  limit: number,
  total: number
): (number | string)[] => {
  const totalPages = Math.ceil(total / limit);

  const pages: (number | string)[] = [];
  const delta = 1;

  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  pages.push(1);

  if (left > 2) pages.push("...");

  for (let i = left; i <= right; i++) {
    if (!pages.includes(i)) pages.push(i);
  }

  if (right < totalPages - 1) pages.push("...");

  if (!pages.includes(totalPages)) pages.push(totalPages);
  return pages;
};
