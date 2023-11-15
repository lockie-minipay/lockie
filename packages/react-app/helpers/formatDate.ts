const formatDate = (date: string): string => {
  const myDate = new Date(parseInt(date) * 1000);

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  //@ts-ignore
  return myDate.toLocaleDateString("en-US", options);
};

export default formatDate;
