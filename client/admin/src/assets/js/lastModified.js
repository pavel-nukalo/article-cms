export const lastModified = function () {
  let date;

  if (this.doc.metadata.lastModified) date = new Date(this.doc.metadata.lastModified);
  else date = new Date();

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  return date.toLocaleString("ru", options);
};