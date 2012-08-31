/*
 * UnframeIt!
 *
 * Injection script, injects unframeit script directyly into page DOM element bypassingChrome's sandbox
 *
 * @package		UnframeIt!
 * @author		Trajche Petrov a.k.a SkechBoy
 * @link		https://skechboy.com
*/
(function()
{
	var scr = document.createElement("script");
	scr.type = "text/javascript";
	scr.src = chrome.extension.getURL('/js/unframeit.js');
	(document.head || document.body || document.documentElement).appendChild(scr);
})();