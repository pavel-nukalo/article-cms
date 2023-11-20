export const lastModified = function () {
  let date = '';

  if (this.doc.metadata.lastModified) date = new Date(this.doc.metadata.lastModified).toString();

  return date;
};