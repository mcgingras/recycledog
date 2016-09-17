function get(name) {
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}

var url = get('url');
var exp = url.split('.');
var str_array = url.split('/');
var store = exp[1];

console.log('url: ' + url);
console.log('explode: ' + exp);
console.log('store is ' + store);
console.log('str_array: ' + str_array);

for (var i = 0; i < split_slash.length; i++) {
  var str = str_array[i];
  console.log('element: ' + str);
}
