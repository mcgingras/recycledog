function get(name) {
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}

var url = get('url');
var exp = url.split('.');
var split_slash = url.split('/');
var store = exp[1];

console.log('url: ' + url);
console.log('explode: ' + exp);
console.log('store is ' + store);
console.log('split_slash: ' + split_slash);

for (s in split_slash) {
  console.log('element: ' + s);
  
}
