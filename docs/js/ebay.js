// Parse the response and build an HTML table to display search results
function _cb_findItemsByKeywords(root) {
  var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  var html = [];

  console.log('root: ' + root);
  console.log('root.findItemsByKeywordsResponse[0]: ' + root.findItemsByKeywordsResponse[0]);
  console.log('items: ' + items);

  html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
  for (var i = 0; i < items.length; ++i) {
    var item     = items[i];
    var title    = item.title;
    var pic      = (item.galleryURL).replace('http:','https:');
    var viewitem = item.viewItemURL;
    if (null != title && null != viewitem) {
      html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' +
      '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
    }
  }
  html.push('</tbody></table>');
  document.getElementById("results").innerHTML = html.join("");
}  // End _cb_findItemsByKeywords() function

// // Create a JavaScript array of the item filters you want to use in your request
// var filterarray = [
//   {"name":"MaxPrice",
//    "value":"25",
//    "paramName":"Currency",
//    "paramValue":"USD"},
//   {"name":"FreeShippingOnly",
//    "value":"true",
//    "paramName":"",
//    "paramValue":""},
//   {"name":"ListingType",
//    "value":["AuctionWithBIN", "FixedPrice", "StoreInventory"],
//    "paramName":"",
//    "paramValue":""},
//   ];
//
//
// // Define global variable for the URL filter
// var urlfilter = "";
//
// // Generates an indexed URL snippet from the array of item filters
// function  buildURLArray() {
//   // Iterate through each filter in the array
//   for(var i=0; i<filterarray.length; i++) {
//     //Index each item filter in filterarray
//     var itemfilter = filterarray[i];
//     // Iterate through each parameter in each item filter
//     for(var index in itemfilter) {
//       // Check to see if the paramter has a value (some don't)
//       if (itemfilter[index] !== "") {
//         if (itemfilter[index] instanceof Array) {
//           for(var r=0; r<itemfilter[index].length; r++) {
//             var value = itemfilter[index][r];
//             urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value ;
//           }
//         }
//         else {
//           urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
//         }
//       }
//     }
//   }
// }  // End buildURLArray() function
//
// // Execute the function to build the URL filter
// buildURLArray(filterarray);

function run_ebay_query(query_str_lst) {
  console.log('run ebay query');
  // Construct query keywords
  var keywords = '&keywords=' + query_str_lst.join('%20').replace(/ /g,'%20');
  console.log('all keywords: ' + keywords)
  keywords = '&keywords=' + query_str_lst.slice(0,2).join('%20').replace(/ /g,'%20');    // CHANGE LATER***************
  keywords = '&keywords=' + query_str_lst[0].replace(/ /g,'%20');    // CHANGE LATER***************
  console.log('keywords: ' + keywords);

  // Construct the request
  var url = "https://svcs.ebay.com/services/search/FindingService/v1";
      url += "?OPERATION-NAME=findItemsByKeywords";
      url += "&SERVICE-VERSION=1.0.0";
      url += "&SECURITY-APPNAME=BrandonW-bhr-PRD-12f4c750a-2d64e0f2";
      url += "&GLOBAL-ID=EBAY-US";
      url += "&RESPONSE-DATA-FORMAT=JSON";
      url += "&callback=_cb_findItemsByKeywords";
      url += "&REST-PAYLOAD";
      url += "&keywords=polo%20tshirt";
      url += "&paginationInput.entriesPerPage=5";

  // Submit the request
  s=document.createElement('script'); // create script element
  s.src= url;
  document.body.appendChild(s);
}
