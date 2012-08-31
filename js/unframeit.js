/*
 * UnframeIt!
 *
 * Remove top frames from news agregators and redirect's you to the original page 
 *
 * @package		UnframeIt!
 * @author		Trajche Petrov a.k.a SkechBoy
 * @link		https://skechboy.com
*/

UnframeIt =
{
	bad_hosts :
	[
		'static.ak.facebook.com', 's-static.ak.facebook.com', 'platform.twitter.com', 'plusone.google.com',
		'www.facebook.com', 'plus.google.com', 'twitter.com'
	],
/*
 * ---------------------------------------------------------------------------------------------------------------------
 * Disable unload events definded by agregators
 * ---------------------------------------------------------------------------------------------------------------------
*/
	unload : function()
	{
		// reset unbefore unload events
		window.onbeforeunload = null;

		// check if jQuery is loaded 
		if (typeof($) != "undefined")
		{
			$(window).unbind();
		}
	},

/*
 * ---------------------------------------------------------------------------------------------------------------------
 * Get content iframe
 * ---------------------------------------------------------------------------------------------------------------------
*/
	get_frame : function()
	{
		frames = document.getElementsByTagName('iframe');

		if(frames.length == 1) // check if agregator frame have social widgets (facebook, twitter, g+ ...)
		{
			return frames[0];
		}
		else
		{
			for (id in frames)
			{
				hostname = this.get_hostname(frames[id].src);

				if(!this.in_array(this.bad_hosts,hostname) && location.hostname != hostname)
				{
					return frames[id];
				}
			}
		}
	},

/*
 * ---------------------------------------------------------------------------------------------------------------------
 * Remove frame by changing top location href
 * ---------------------------------------------------------------------------------------------------------------------
*/
	remove_frame : function()
	{
		// get content iframe
		frame = this.get_frame();
		//disable unload events
		this.unload();
		//remove frame
		top.location.href = frame.src;
	},
/*
 * ---------------------------------------------------------------------------------------------------------------------
 * Extract domain hostname
 * ---------------------------------------------------------------------------------------------------------------------
*/	
	get_hostname : function (data) 
	{
  		var a = document.createElement ('a');
		a.href = data;
		return a.hostname;
	},

/*
 * ---------------------------------------------------------------------------------------------------------------------
 * Check if element is in array
 * ---------------------------------------------------------------------------------------------------------------------
*/
	in_array : function(arr,obj) 
	{
		return (arr.indexOf(obj) != -1);
	}
}
UnframeIt.remove_frame();