function get(name) {
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}

$("#no-url").hide();
var urlid = window.location.href;
if(urlid.split(".")[2] == "io/recycledog/"){
  $("#yes-url").hide();
  $("#no-url").show();

}

// List of stores [urlname,actual name] (name we want in query is on the right)
var store_names_lst = [
  ["thenorthface","north face"],
  ["bananarepublic","banana republic"],
  ["ae","american eagle"],
  ["anntaylor","ann taylor"],
  ["frenchconnection","french connection"],
  ["ralphlauren","ralph lauren"],
  ["underarmour","under armour"]
];


var yql_results = "";
var url = get('url');
var query_str_lst = [];
var str_array = url.split("/");

// Get store name from website name
var exp = url.split(".");
var store_name = exp[1];


for (var i = 0; i < str_array.length; i++) {
  var str = str_array[i];

  // replace www.company_name.com with just company_name
  if (str.match(/.*\..*\..*/) && (i == 0 || i == 2)) {
    str = store_name;

    // North Face - insert spaces for thenorthface
    for (var j = 0; j < store_names_lst.length; j++) {
      var store_j = store_names_lst[j];
      if (str == store_j[0]) {
        str = store_j[1];
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
