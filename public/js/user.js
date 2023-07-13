$(document).ready (function () {
	var toggles = $(".filter-toggle");
	$(toggles[0]).on ("click", function () {toggle_filter ("review")});
	$(toggles[1]).on ("click", function () {toggle_filter ("favorite")});
	$(toggles[2]).on ("click", function () {toggle_filter ("transaction")});

	toggle_filter ("review");

	/* Item filters */
	function toggle_filter (type) {
		var entries = $(".box-dark");
		var placeholders = $(".placeholder");

		for (var i = 0; i < entries.length; i++) {
			if ($(entries[i]).hasClass (type))
				$(entries[i]).removeClass ("hidden");
			else
				$(entries[i]).addClass ("hidden");
		}

		for (var i = 0; i < placeholders.length; i++) {
			if ($(placeholders[i]).hasClass (type))
				$(placeholders[i]).removeClass ("hidden");
			else
				$(placeholders[i]).addClass ("hidden");
		}
	}

	// Ref: https://stackoverflow.com/questions/10849421/textarea-empty-check
	function trim(str) { 
		return str.replace(/^\s+|\s+$/g,''); 
	}
});