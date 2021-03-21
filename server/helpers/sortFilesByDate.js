function sortFilesByDate(files) {
  files.sort((a, b) => {
    return b.metadata.timeCreated > a.metadata.timeCreated ? 1 : -1;
  });
}

module.exports = sortFilesByDate;