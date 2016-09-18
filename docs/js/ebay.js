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
    var viewitem = item.viewItemURL;
    var item_id  = item.itemId;
    var yoururl;

    if (null != title && null != viewitem) {

      yoururl = "https://crossorigin.me/http://open.api.ebay.com/shopping?callname=GetSingleItem&version=667&appid=BrandonW-bhr-PRD-12f4c750a-2d64e0f2&itemid="+item_id+"&responseencoding=JSON";
      $.ajax({ url: yoururl, success: function(data) {
        var json = JSON.parse(data);
        var pic = json.Item.PictureURL[0];
        var id = json.Item.ItemID;
        console.log("update background image for: " + id);
        $("."+id).css({"background-image": "url(\'"+pic+"\"'+)"});

      }});

      html.push('<a href="'+viewitem+'"><div class="grid"><div class="grid--img '+item_id+'"></div><div class="grid--info"><div class="grid--info-h4">'+title+'</div><h6>$'+price+'</h6></div></div></a>');

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
    $(".popover-wrapper.error").addClass("show");
  }

  console.log('html: ' + html);
  document.getElementById("js-body--grid").innerHTML = html.join("");
}  // End _cb_findItemsByKeywords() function

function run_ebay_query(query_str_lst) {
  // Construct query keywords
  var keywords = '&keywords=' + query_str_lst[0].replace(/ /g,'%20');
  if (query_str_lst.length > 1) {
    keywords += '%20(' + query_str_lst.slice(1,query_str_lst.length).join(',').replace(/ /g,'%20') + ')';
  }
  console.log('eBay query SEARCH: ' + keywords);

  // Construct the request
  var url = "https://svcs.ebay.com/services/search/FindingService/v1";
      url += "?OPERATION-NAME=findItemsByKeywords";
      url += "&SERVICE-VERSION=1.10.0";
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
