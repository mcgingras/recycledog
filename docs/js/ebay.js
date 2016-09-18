// Parse the response and build an HTML table to display search results
function _cb_findItemsByKeywords(root) {
  var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  var html = [];
  var dirty;

  console.log('eBay query results length: ' + items.length);

  for (var i = 0; i < items.length; ++i) {
    if (i%3 == 0) {
      html.push('<div class="grid--row">');
      dirty = true;
    }


    var item     = items[i];
    var title    = item.title;
    var price    = item.sellingStatus["0"].currentPrice["0"].__value__;
    var pic      = item.galleryURL.toString().replace('http:','https:');
    var viewitem = item.viewItemURL;
    if (null != title && null != viewitem) {
      html.push('<a href="'viewitem'"><div class="grid"><div class="grid--img" style="background-image: url(\''+pic+'\')"></div><div class="grid--info"><div class="grid--info-h4">'+title+'</div><h6>$'+price+'</h6></div></div></a>');
    }

    if (i%3 == 2){
      html.push('</div>');
      dirty = false;
    }

  }

  if (dirty) {
    html.push('</div>');
  }


  // If No Results
  if (items.length == 0) {
    html.push('<p>Sorry, we couldn\'t find anything.</p>');
  }

  document.getElementById("js-body--grid").innerHTML = html.join("");
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
//    "value":["AuctionWithBIN", "FixedPrice"],
//    "paramName":"",
//    "paramValue":""},
//   ];

// // Define global variable for the URL filter
// var urlfilter = "";

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
//           var value = itemfilter[index][r];
//           urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value ;
//           }
//         }
//         else {
//           urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
//         }
//       }
//     }
//   }
// }  // End buildURLArray() function

//   url += urlfilter;

// Execute the function to build the URL filter
// buildURLArray(filterarray);

function run_ebay_query(query_str_lst) {
  // Construct query keywords
  var keywords = '&keywords=' + query_str_lst[0].replace(/ /g,'%20');
  if (query_str_lst.length > 1) {
    keywords += '%20(' + query_str_lst.slice(1,query_str_lst.length).join(',').replace(/ /g,'%20') + ')';
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
      url += "&paginationInput.entriesPerPage=6";

  // Submit the request
  s=document.createElement('script'); // create script element
  s.src= url;
  document.body.appendChild(s);
}
