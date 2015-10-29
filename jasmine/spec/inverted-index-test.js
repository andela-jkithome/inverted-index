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
      var index = invertedIndex.getIndex(results);
      expect(typeof index).toBe('object');
      expect(index.alice).toBeDefined();
      expect(index.fellowship).toBeDefined();
    });

    it('ensure index is correct', function() {
      var index = invertedIndex.getIndex(results),
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
});