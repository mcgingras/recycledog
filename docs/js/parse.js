function get(name) {
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}



var yql_results = "";
var query_str_lst = [];
var url = get('url');
var str_array = url.split("/");

// Get store name from website name
var exp = url.split(".");
var store_name = exp[1];

// console.log('url: ' + url);
// console.log('explode: ' + exp);
// console.log('store is ' + store_name);
// console.log('str_array: ' + str_array);

for (var i = 0; i < str_array.length; i++) {
  var str = str_array[i];

  // replace www.company_name.com with just company_name
  if (str.includes('www.'+store_name)) {
    str = store_name;
  }

  // remove .com at end
  if(str.includes(".")) {
    str = str.split(".")[0];
  }

  // replace underscores with space
  str = str.replace(/_/g,' ');

  // remove empty elements and 'https'
  if (str != "" && !str.match('http*:')) {
    query_str_lst.push(str);
  }
}

document.getElementById('js-url').innerHTML = query_str_lst;

// console.log('query_str_lst: ' + query_str_lst);

// Run eBay query
run_ebay_query(query_str_lst);

// QUERY Yahoo Query Language to get website data
// var yql_query = 'SELECT * FROM html WHERE url="'+url+'"';
//
// var query_url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22"+encodeURIComponent(url)+"https%3A%2F%2Fwww.jcrew.com%2Fmens_category%2Fsweaters%2FJCrewcashmere%2FPRDOVR~F3994%2FF3994.jsp%22&format=json&diagnostics=true&callback=";
//
// var title_list = $.getJSON(query_url);
// console.log(Object.keys(title_list));
//
// if (title_list.hasOwnProperty("responseJSON")) {
//     var response_json_body = title_list.responseJSON.query.results.body;
//     console.log('response_json_body: ' + response_json_body);
// }
// else { console.log("responseJSON is undefined"); }
//
// var response = setTimeout(function() {
//     return title_list.responseJSON.query.results.body;
// }, 100);
//
// console.log(response);
