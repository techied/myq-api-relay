# MyQ API Relay

Connects the MyQ API (with myq-api npm module) to a web server so that actions can be taken with token authentication (good for IFTTT, other basic webhook triggers).

## Supported endpoints

`/` - Sanity check to see if the server's running. Replies "OK"

`/open?token=xxx` - Opens the door predefined in `$MYQ_SERIAL_NUMBER` if token matches `$TOKEN`

`/close?token=xxx` - Closes the door predefined in `$MYQ_SERIAL_NUMBER` if token matches `$TOKEN`