const getTheTitles = function(books) {
  let titles = [];
  books.filter(item => {
    titles.push(item.title);
  });
  return titles;
};

// Do not edit below this line
module.exports = getTheTitles;
