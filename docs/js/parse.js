function get(name){
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}

var url = get('url');

function getPosition(str, m, i) {
   return str.split(m, i).join(m).length;
}

var dog = "www.facebook.com";
var exp = dog.split('.');
var store = exp[1];

alert('store is' + store);

alert("url: " + url);
