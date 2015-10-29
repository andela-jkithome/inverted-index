describe('Inverted Index tests', function() {
  var invertedIndex = new Index();

  // Before each test can run do this.
  beforeEach(function(done) {
    invertedIndex.createIndex('./books.json').done(function(data) {
      invertedIndex.results = data;
      invertedIndex.getIndex(data);
      done();
    });
  });

  describe('Read book data', function() {
    // Check whether the JSON data is an array containing objects
    it('Loads JSON data successfully', function() {
      expect(invertedIndex.results).not.toBeUndefined();
      expect(invertedIndex.results.length).not.toEqual(0);
      expect(invertedIndex.results.length).toBe(2);
      expect(Array.isArray(invertedIndex.results)).toBe(true);
    });
    // The array should contain objects.
    it('Contents of the array are objects', function() {
      expect(invertedIndex.results[0] instanceof Object).toBe(true);
      expect(invertedIndex.results[1] instanceof Object).toBe(true);
    });
  });

  describe('creates index', function() {

    it('confirm index is created', function() {
      var index = invertedIndex.dataIndex;
      expect(typeof index).toBe('object');
      expect(index.alice).toBeDefined();
      expect(index.fellowship).toBeDefined();
    });

    it('ensure index is correct', function() {
      var index = invertedIndex.dataIndex;
      var indexKeys = Object.keys(index);

      // Index contains words from the file.
      expect(indexKeys).toContain('powerful');
      expect(indexKeys).not.toContain('a');
      expect(indexKeys).toContain('wonderland');
      expect(indexKeys).toContain('lord');
      expect(indexKeys).not.toContain('of');
      expect(indexKeys).not.toContain('the');
      expect(indexKeys).toContain('rings');
      expect(indexKeys).toContain('alliance');
      expect(indexKeys).not.toContain('superman');
    });

  });

  describe('Search index', function() {

    it('returns the correct results when searched', function() {
      expect(invertedIndex.searchIndex('jeremy')).toEqual([-1]);
      expect(Array.isArray(invertedIndex.searchIndex('alice'))).toBe(true);
      expect(invertedIndex.searchIndex('alice')).toContain(0);
      expect(invertedIndex.searchIndex('fellowship')).toContain(1);
    });

    it('can search more than one term', function() {
      // All words that don't exist should result in -1.
      expect(invertedIndex.searchIndex('jeremy', 'superhero')).not.toContain(0);
      expect(invertedIndex.searchIndex('jeremy', 'superhero', 'javascript')).not.toContain(1);

      // Result should be 1 or 0 for words that exist.
      expect(invertedIndex.searchIndex('imagination', 'rings')).toContain(0);
      expect(invertedIndex.searchIndex('alliance', 'wizard', 'dwarf')).toContain(1);
    });

    it('can handle an array of search terms', function() {
      // Give it an array of strings as an argument.
      expect(invertedIndex.searchIndex(['rabbit', 'world'])).toContain(0);
      expect(invertedIndex.searchIndex(['fellowship', 'destroy', 'powerful'])).toContain(1);
    });
  });
});
