import React from "react";
import ReactDOM from "react-dom";
import Screen from "./components/Screen.jsx";

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var getSitemapParameter = function getSitemapParameter() {
    return (getUrlParameter('sitemap') ? getUrlParameter('sitemap') : 'panel')
};

var getVisibleScreensParameter = function getVisibleScreensParameter() {
    var p = getUrlParameter("visibleScreens");
    if (p && p.length > 0) return p;
    return [];
};

var x = 1;

var animationFrameId;

function setX(newX) {
    clearAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(function () {
        x = newX;
        doRender();
    })
}



ReactDOM.render(
    <Screen
        url={"/rest/sitemaps/" + getSitemapParameter() + "?Accept=application/json"}
        pollInterval={5000}
        visibleScreens={getVisibleScreensParameter()}
        setX={setX}
        x={x}
    />,
    document.getElementById('content')
);