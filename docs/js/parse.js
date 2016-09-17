function get(name) {
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}

// List of stores [urlname,actual name] (name we want in qury is on the right)
var store_names_lst = [
  ["thenorthface","north face"]
]



var yql_results = "";
var query_str_lst = [];
var url = get('url');
var str_array = url.split("/");

// Get store name from website name
var exp = url.split(".");
var store_name = exp[1];


for (var i = 0; i < str_array.length; i++) {
  var str = str_array[i];

  // replace www.company_name.com with just company_name
  if (str.includes('www.'+store_name)) {
    str = store_name;

    // North Face - insert spaces for thenorthface
    for (int i = 0; i < store_names; i++) {
      var store_i = store_names_lst[i];
      if (str == store_i[0]) {
        str = store_i[1];
      }
    }
  }

  // remove .com at end
  if(str.includes(".")) {
    str = str.split(".")[0];
  }

  // NORTH FACE remove -text?stuff
  if (store_name == 'thenorthface') {
    if (str.includes('?')) {
      last_index = str.lastIndexOf('-');
      str = str.substring(0,last_index);
    }
  }

  // replace underscores with space
  str = str.replace(/_/g,' ');

  // replace dash (-) with space
  str = str.replace(/-/g,' ')

  // remove empty elements and 'https'
  if (str != "" && !str.includes('http')) {
    query_str_lst.push(str);
  }
}

console.log('query_str_lst: ' + query_str_lst);

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
