export default function TitleSlice(title, start, end) {
  const slicedTitle =
    title.length > end ? title.slice(start, end) + "..." : title;

  return slicedTitle;
}
