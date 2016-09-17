function get(name) {
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}



var yql_results = "";
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
    str = store_name;
  }

  if(str.includes(".")) {
    str = str.split(".")[0];
  }

  // remove empty elements and 'https'
  if (str != "" && str != 'https:') {
    query_str_lst.push(str);
  }
}

console.log('query_str_lst: ' + query_str_lst);

// QUERY Yahoo Query Language to get website data
var yql_query = 'SELECT * FROM html WHERE url="'+url+'"';

var query_url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22"+encodeURIComponent(url)+"https%3A%2F%2Fwww.jcrew.com%2Fmens_category%2Fsweaters%2FJCrewcashmere%2FPRDOVR~F3994%2FF3994.jsp%22&format=json&diagnostics=true&callback=";

var title_list = $.getJSON(query_url);
console.log("title_list: type:" + typeof(title_list));
console.log(title_list.responseJSON);
var response_json = title_list.responseJSON.query.results.body;
console.log('encode url: ' + encodeURIComponent(url));
console.log('response_json: ' + response_json);

// // Define your callback:
// var callback = function(data) {
//     var post = data.query.results.item;
//     console.log("post: " + post);
//     console.log("data.query.results: " + data.query.results.item);
//     alert(post.title);
// };

// Instantiate with the query:
// var firstFeedItem = new YQLQuery(yql_query, callback);

// If you're ready then go:
// firstFeedItem.fetch(); // Go!!
