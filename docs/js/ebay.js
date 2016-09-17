// Parse the response and build an HTML table to display search results
function _cb_findItemsByKeywords(root) {
  var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  var html = [];

  console.log('eBay query results length: ' + items.length);

  html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
  for (var i = 0; i < items.length; ++i) {
    var item     = items[i];
    var title    = item.title;
    var pic      = item.galleryURL.toString().replace('http:','https:');
    var viewitem = item.viewItemURL;
    if (null != title && null != viewitem) {
      html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' +
      '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
    }
  }
  // If No Results
  if (items.length == 0) {
    html.push('<p>Sorry, we couldn\'t find anything.</p>');
  }
  html.push('</tbody></table>');
  document.getElementById("results").innerHTML = html.join("");
}  // End _cb_findItemsByKeywords() function



function run_ebay_query(query_str_lst) {
  // Construct query keywords
  var keywords = '&keywords=' + query_str_lst[0];
  if (query_str_lst.length > 1) {
    keywords += '%20(' + query_str_lst.slice(1,query_str_lst.length).join(',').replace(/ /g,',') + ')';
  }
  // keywords += query_str_lst[0];  + query_str_lst.join('%20').replace(/ /g,'%20');
  // keywords = '&keywords=(' + query_str_lst.join(',').replace(/ /g,',') + ')';
  console.log('eBay query SEARCH: ' + keywords);

  // Construct the request
  var url = "https://svcs.ebay.com/services/search/FindingService/v1";
      url += "?OPERATION-NAME=findItemsByKeywords";
      url += "&SERVICE-VERSION=1.0.0";
      url += "&SECURITY-APPNAME=BrandonW-bhr-PRD-12f4c750a-2d64e0f2";
      url += "&GLOBAL-ID=EBAY-US";
      url += "&RESPONSE-DATA-FORMAT=JSON";
      url += "&callback=_cb_findItemsByKeywords";
      url += "&REST-PAYLOAD";
      url += keywords;
      url += "&paginationInput.entriesPerPage=5";

  // Submit the request
  s=document.createElement('script'); // create script element
  s.src= url;
  document.body.appendChild(s);
}
