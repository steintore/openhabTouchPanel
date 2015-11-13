# openhabTouchPanel
This repository is the start of my new OpenHAB smart house touch panel. 
Technologies used so far: React.js, FontAwesome and Twitter Bootstrap

## installation
- clone the repository into for example openhab/webapps/panel
- npm install
- start openhab locally
- npm run dev
- go to localhost:8080/panel

## Configuration

You can send the parameter visibleScreens to the server, to ask for a specific ordering of screens to show, for example
http://localhost:8080/panel?visibleScreen=[2,1]
will show only screen 2 and 1, and in the specified order.

## Notes
Currently the touch panel software fetches a sitemap called panel.sitemap, and shows only some of the items.



More details to come...
