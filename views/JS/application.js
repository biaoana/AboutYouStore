var slideIndex = 1;
  showDivs(slideIndex);

  function plusDivs(n) {
    showDivs((slideIndex += n));
  }

  function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if(x.length>0){
    if (n > x.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
  }else
  {
    var i;
    var x = document.getElementsByClassName("mySlide");
    if(x.length>0){
    if (n > x.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
  }
  }
}

$(document).ready(function () {
  $(".moreResults").click(function () {
    var url = $(".moreResults").data("url");
    var index = url.indexOf("=");
    var page = +url.slice(index + 1, url.length) + 1;
    location.replace(url.replace(url.substring(index + 1, url.length), page));
  });
  if ($.cookie("loggedIn")) {
    $("<li><a href=/logout>| Logout</a></li>").appendTo(".menu");
  } else {
    $("<li><a href=/login>| Login</a></li>").appendTo(".menu");
  }
  
  $(".color").click(function () {
    var element = $(".element").val();
    $(".error").text("");
    element = JSON.parse(element);
    var color = $(this).data("color");
    var imageGroup = JSON.parse($(".imageGroup").val());
    var variants = JSON.parse($(".variants").val());
    var selectBox = [];
    var position = 0;
    var ok = 0;
    for (var i = 0; i < element.length; i++) {
      if (element[i].name === color) {
        position = i;
        break;
      }
    }
    for (var i = 0; i < imageGroup.length; i++) {
      if (
        imageGroup[i].images[0].link.includes(color) &&
        imageGroup[i].view_type == "large"
      ) {
        ok = 1;
        $(".photo").empty();
        for (var j = 0; j < imageGroup[i].images.length; j++) {
          if(j===0){
            $(
              `<img class='mySlide' src=/images/${imageGroup[i].images[j].link} style='width:100% ;display:block'>`
            ).appendTo(".photo");
            }
            else
            {
              $(
                `<img class='mySlide' src=/images/${imageGroup[i].images[j].link} style='width:100% ;display:none'>`
              ).appendTo(".photo");
            }
        }
        break;
      }
    }
    if (ok === 0) {
      $(".error").text("This item has no photos");
    }
    for (var i = 0; i < variants.length; i++) {
      if (variants[i].variation_values.color === color)
        selectBox.push(variants[i]);
    }
    createSelectList(selectBox);
  });
  function createSelectList(selectBox) {
    $(".sizeSection").empty();
    var s = $('<select name="size">');
    s.append($("<option>Select a size</option>"));
    for (var i in selectBox)
      s.append(
        $(`<option value='${selectBox[i].product_id}'>`).html(
          `Price:${selectBox[i].price} Size:${selectBox[i].variation_values.size}`
        )
      );
    $(s).appendTo(".sizeSection");
  }
});
