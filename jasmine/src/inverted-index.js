function Index() {
  this.createIndex = function(filepath) {
    return $.getJSON(filepath);
  }
  this.getIndex = function(bookArray) {
    // List of common words to be excluded from the index.
    var stopList = ["a", "an", "and", "as", "at", "but", "by", "each", "every", "for", 
    "from", "her", "his", "in", "into", "its", "like", "my", "no", "nor",
    "of", "off", "on", "onto", "or", "our", "out", "outside", "over", "past", 
    "since", "so", "some", "than", "that", "the", "their", "this", "to", "up", "with"];
    var arr = bookArray;
    // initialise array to contain title and text strings from the JSON file.
    var invIndex =[];

    // Loop through the array and add the title and text strings to the array words.
    arr.forEach(function (book) {
      (Object.keys(book)).forEach(function (keys) { 
        var words = [];
        (keys.split(/[.,:;" "\/ -]/)).forEach(function (word) {
          if (word != "") {
            // Make the word lowercase before adding it to the array.
            words.push(word.toLowerCase());
          }
        });
        (book[keys].split(/[.,:;" "\/ -]/)).forEach(function (word) {
          if (word != "") {
            // Make the word lowercase before adding it to the array.
            words.push(word.toLowerCase());
          }
        });
        words.forEach(function (entries) {
          invIndex.push(entries);
        })
      });
    });
    // Sort the words alphabetically and remove duplicates.
    invIndex = invIndex.sort().reduce(function(a, b){ if (b != a[0]) a.push(b); return a }, []);
    
    // Initiliase array to contain the words to be indexed.
    var indexable = [];

    // Loop through singleWords and add words not in the stoplist to the final list of indexable words.
    invIndex.forEach(function(singleword) {
      if(stopList.indexOf(singleword) === -1) {
        indexable.push(singleword);
      }
    });

    // Initialise an object wordIndex to hold the index of the words.
    var wordIndex = {};

    // Search for the location of the word then create an index.
    indexable.forEach(function(element) {
      arr.forEach(function(object, index) {
        (Object.keys(object)).forEach(function(key) {
          if(((arr[index][key]).toLowerCase()).indexOf(element) != -1) {
              wordIndex[element] = index;
          }
        });
      });
    });
    console.log(wordIndex);
    return wordIndex;
  }
  this.SearchIndex = function(terms) {
    
  }
}