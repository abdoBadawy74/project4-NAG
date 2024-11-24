export default function TransformDate(date) {
  const selectedDate = new Date(date);
  const getFullyear = selectedDate.getFullYear();
  const getMonth = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
  const getDate = selectedDate.getDate().toString().padStart(2, "0");

  return `${getFullyear}-${getMonth}-${getDate}`;
}
