function get(name) {
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}

var query_str_lst = [];
var url = get('url');
var str_array = url.split('/');

// Get store name from website name
var exp = url.split('.');
var store_name = exp[1];

console.log('url: ' + url);
console.log('explode: ' + exp);
console.log('store is ' + store_name);
console.log('str_array: ' + str_array);

for (var i = 0; i < str_array.length; i++) {
  var str = str_array[i];
  console.log('element: ' + str);

  // replace www.company_name.com with just company_name
  if (str.includes('www.'+store_name)) {
    str = store_name
  }

  // remove empty elements and 'https'
  if (str != "" && str != 'https:') {
    query_str_lst.push(str);
  }
}

console.log('query_str_lst: ' + query_str_lst);
