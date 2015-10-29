describe("Inverted Index tests", function() {
  var invertedIndex = new Index();
  var results = [];

  // Before each test can run do this.
  beforeEach(function(done) {
    invertedIndex.createIndex("./books.json").done(function(data) {
      results = data;
      done();
    });
  });

  describe("Read book data", function() {
    // Check whether the JSON data is an array containing objects
    it("Loads JSON data successfully", function() {
      expect(results).not.toBeUndefined();
      expect(results.length).not.toEqual(0);
      expect(results.length).toBe(2);
      expect(Array.isArray(results)).toBe(true);
    });
    it("Contents of the array are objects", function() {
      expect(results[0] instanceof Object).toBe(true);
      expect(results[1] instanceof Object).toBe(true);
    });
  });

  describe('creates index', function() {

    it('confirm index is created', function() {
      invertedIndex.getIndex(results);
      var index = invertedIndex.dataIndex;
      expect(typeof index).toBe('object');
      expect(index.alice).toBeDefined();
      expect(index.fellowship).toBeDefined();
    });

    it('ensure index is correct', function() {
      invertedIndex.getIndex(results);
      var index = invertedIndex.dataIndex,
        indexKeys = Object.keys(index);

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
    invertedIndex.getIndex(results);
    expect(invertedIndex.searchIndex('jeremy')).toEqual([-1]);
    expect(Array.isArray(invertedIndex.searchIndex('alice'))).toBe(true);
    expect(invertedIndex.searchIndex('alice')).toContain(0);
    expect(invertedIndex.searchIndex('fellowship')).toContain(1);
  });

  it('can search more than one term', function() {
    invertedIndex.getIndex(results);
    // All words that don't exist should result in -1.
    expect(invertedIndex.searchIndex('jeremy', 'superhero')).not.toContain(0);
    expect(invertedIndex.searchIndex('jeremy', 'superhero', 'javascript')).not.toContain(1);

    // Result should be 1 or 0 for words that exist.
    expect(invertedIndex.searchIndex('imagination', 'rings')).toContain(0);
    expect(invertedIndex.searchIndex('alliance', 'wizard', 'dwarf')).toContain(1);
  });

  it('can handle an array of search terms', function() {
    invertedIndex.getIndex(results);
    // Give it an array of strings as an argument.
    expect(invertedIndex.searchIndex(['rabbit', 'world'])).toContain(0);
    expect(invertedIndex.searchIndex(['fellowship', 'destroy', 'powerful'])).toContain(1);
  });
});
});