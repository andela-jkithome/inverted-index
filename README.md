# inverted-index
Running the checkpoint.

For security reasons Javascript cannot local files in chrome. Therefore, we need to make 
the file containing the checkpoint a webserver. To do this I used local web server a node 
js package that can be found at https://www.npmjs.com/package/local-web-server. Once 
run ws at the folder you want to serve.

Module explanation.

createIndex:
It uses jQuery's getJSON mehod(used to get JSON data using an AJAX HTTP GET request) to 
read the book.json file. It then returns the data which should be an array containing 
objects.

getIndex:
It takes the data obtained by createIndex as an argument. THe data returned is in form 
of an array. It loops through the array to obtain its contents(objects). It then obtains 
the keys of the object using Object.keys(object) method which ouputs an array. It then loops 
through the array  using each key to access the particular object's value which is a string. 
The strings are then split into individual words which are added to an array. Duplicate words
are then removed and the array sorted. Next we compare the words to the contents of a 
stoplist array that contains english words not very important to the context such as a, an,
the and at. Words not in the stoplist are then put in an array contain the final words to be
indexed. Finally, we loop through this array of words comparing them to the contents of the
array read fromm the json file and then add the word as a key in an object and the index of
the containing object as its value. since there weren't occurences of words in both objects,
if the key already exists in the object, the word is ignored. If it doesn't a new key is 
created. getIndex then creates a prototype dataIndex of the class Index and assigns it 
the object containing the indexed words.

searchIndex:
It takes arguements either as an array of words or several string and searches for them in
dataIndex then returns an array containing the values that point to the location of the 
object(in the json data array) containing the word searched for.   