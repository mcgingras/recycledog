function get(name) {
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}

function getPosition(str, m, i) {
   return str.split(m, i).join(m).length;
}

var url = get('url');
var exp = url.split('.');
var store = exp[1];

console.log('url: ' + url);
console.log('explode: ' + exp);
console.log('store is ' + store);
