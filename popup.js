// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function gotoMark(id) {
    var mark = $(id.currentTarget).attr("id")

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: "document.getElementById('" + mark + "').scrollIntoView(true); window.scrollBy(0, -60)" });
    });
}
function display_h1(results) {
    var h1List = $(results[0]).find(".sect1, .sect2, .sect3")

    if (h1List.length > 1) {
        var h1Index = 1;
        for (var i = 0; i < h1List.length; i++) {
            var output = "";
            var title = $(h1List[i]).parent().attr("data-pdf-bookmark")

            var className = $(h1List[i]).attr("class")
            var idName = $(h1List[i]).attr("id")
            if (className === "sect1") {
                output += "<h2>" + h1Index + ". <a href='#' id='" + idName + "'>" + title + "</a></h2>";
                h1Index++;
            } else if (className === "sect2") {
                output += "<h3 style='margin-left:5px'><a href='#' id='" + idName + "'>" + title + "</a></h3>";
            } else {
                output += "<h4 style='margin-left:10px'><a href='#' id='" + idName + "'>" + title + "</a></h4>";
            }

            $("#list").append(output);
            document.getElementById(idName).addEventListener("click", gotoMark);
        }
    } else {
        h1List = $(results[0]).find(".docChapterTitle, .docSection1Title, .docSection2Title")
        for (var i = 0; i < h1List.length; i++) {
            var output = "";
            var title = $(h1List[i]).text()

            var className = $(h1List[i]).attr("class")
            var idName = $(h1List[i]).attr("id")
            if (className === "docChapterTitle") {
                output += "<h2> <a href='#' id='" + idName + "'>" + title + "</a></h2>";
            } else if (className === "docSection1Title") {
                output += "<h3 style='margin-left:5px'><a href='#' id='" + idName + "'>" + title + "</a></h3>";
            } else {
                output += "<h4 style='margin-left:10px'><a href='#' id='" + idName + "'>" + title + "</a></h4>";
            }

            $("#list").append(output);
            document.getElementById(idName).addEventListener("click", gotoMark);
        }
    }


}

// changeColor.onclick = function (element) {
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        { code: 'document.querySelector("#sbo-rt-content").innerHTML' }, display_h1);
});
// };
