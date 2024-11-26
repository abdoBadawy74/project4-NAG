export default function TitleSlice(title, start, end) {
  const slicedTitle = title.slice(start, end) + "...";

  return slicedTitle;
}
