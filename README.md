# openhab-react-panel
This repository is forked from steintore/openhabTouchPanel. My intent is mostly personal-- I just want a versatile UI for Openhab that is friendly for all devices that doesn't look ancient.
Technologies used so far: React.js, FontAwesome and Twitter Bootstrap

## installation
- clone the repository into for example openhab/webapps/panel
- npm install
- start openhab locally (make sure you have a panel.sitemap in your sitemap folder.
- npm run dev
- go to localhost:8080/panel

## Configuration

You can send the parameter visibleScreens to the server, to ask for a specific ordering of screens to show, for example
http://localhost:8080/panel?visibleScreen=[2,1]
will show only screen 2 and 1, and in the specified order.

## Notes
Currently the touch panel software fetches a sitemap called panel.sitemap, and shows only some of the items.

