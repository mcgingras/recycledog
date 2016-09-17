function get(name) {
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}

var query_str_lst = [];
var url = get('url');
var exp = url.split('.');
var str_array = url.split('/');
var store = exp[1];

console.log('url: ' + url);
console.log('explode: ' + exp);
console.log('store is ' + store);
console.log('str_array: ' + str_array);

for (var i = 0; i < str_array.length; i++) {
  // trim website name to (hopefully) company name
  var str = str_array[i];
  console.log('element: ' + str);

  if (str != "") {
    query_str_lst.push(str);
  }
}

console.log('query_str_lst' + query_str_lst);
