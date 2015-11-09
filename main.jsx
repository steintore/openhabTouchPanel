import React from "react";
import ReactDIM from "react-dom";
import {Screen} from "./js/panel.jsx.js";

ReactDOM.render(
    <Screen
        url={"/rest/sitemaps/" + (getUrlParameter('sitemap') ? getUrlParameter('sitemap') : 'panel') + "?Accept=application/json"}
        pollInterval={5000}/>,
    document.getElementById('content')
);