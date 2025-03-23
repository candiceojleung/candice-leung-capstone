export const formatDateToISO = (date) => {
  return new Date(date).toISOString().split("T")[0];
};
