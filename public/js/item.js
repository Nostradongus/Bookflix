/* ADDING LISTENERS */
$(document).ready(function () {
	// Saves url of current page
	var itemid = parseInt ($("#itemid").html ());
	var pageurl = "/item/" + itemid;

	/* Listener to expand review input area */
	$("#input").on ("click", expand);

	/* Adds listeners to interactive star rating  */
	var stars = $("#input-stars .fa.fa-star");
	$(stars[0]).on ("click", function () {selectStars (1)});
	$(stars[1]).on ("click", function () {selectStars (2)});
	$(stars[2]).on ("click", function () {selectStars (3)});
	$(stars[3]).on ("click", function () {selectStars (4)});
	$(stars[4]).on ("click", function () {selectStars (5)});

	/* Adds listeners to stars in review  validation */
	for (var i = 0; i < 5; i++)
		$(stars[i]).click (enable_submit);

	drawStars ();

	/* Adds listener for favorite/unfavorite action */
	$("#favorite").on ("click", function () {
		itemid = parseInt ($("#itemid").html ());
		var type = $(this).children ()[1];
		type = $(type).html ();

		// If item is not in favorites
		if (type == "Favorite") {
			$.get(pageurl + "/favorite", function(result) {
				if (result != null) {
					$("#favorite").html("<span class='fa fa-heart'></span> <span>Unfavorite</span>");
					$("#favorites").load (pageurl + " #favorites");
				}
			});
		}

		// If item is already in favorites
		else {
			$.get(pageurl + "/unfavorite", function(result) {
				if (result != null) {
					$("#favorite").html ("<span class='fa fa-heart-o'></span> <span>Favorite</span>");
					$("#favorites").load (pageurl + " #favorites");
				}
			});
		}
	});

	/* Adds listener for submitting new review */
	$("#submit-new").on ("click", function () {
		var newRev = {
			rating: parseInt ($("#input-rating").val ()),
			review: $("#input-review").val ().trim ()
		};

		$.get(pageurl + "/insert", newRev, function (result) {
			if (result != null) {
				$("#session-review-box").load (pageurl + " #session-review-box>*", function () {
					$("#item-right").load (pageurl + " #item-right>*");
					$("#input").addClass ("hidden");
					drawStars ();
					$("#toggle-delete").on ("click", clearReview);
				});
			}
		});
	});

	/* Adds listener for editing review */
	$("#submit-edit").on ("click", function () {
		var newRev = {
			rating: parseInt ($("#input-rating").val ()),
			review: $("#input-review").val ().trim ()
		};

		$.get(pageurl + "/update", {review: newRev}, function (result) {
			if (result != null) {
				$("#session-review-box").load (pageurl + " #session-review-box>*", function () {
					$("#item-right").load (pageurl + " #item-right>*");
					$("#session-review-box").removeClass ("hidden");
					$("#input").addClass ("hidden");
					drawStars ();
					$("#toggle-delete").on ("click", clearReview);
				});
			}
		});
	});

	/* Adds listener for deleting review */
	function clearReview () {
		// Resets input box to minimized view
		var elements = $("#input").children();
		
		$(elements[1]).addClass ("hidden");
		var stars = $(elements[1]).children ();
		for (var i = 0; i < 5; i++)
			$(stars[i]).addClass ("unchecked");

		$(elements[2]).addClass ("minimized");
		$(elements[2]).val ("");
		
		$(elements[3]).children().first().addClass ("hidden");
		$("#input").on ("click", expand);

		$("#submit-edit").addClass ("hidden");

		// Changes page contents to align with new data
		$.get(pageurl + "/delete", function (result) {
			if (result != null) {
				$("#session-review-box").load (pageurl + " #session-review-box>*", function () {
					$("#item-right").load (pageurl + " #item-right>*");
					$("#input").removeClass ("hidden");
					drawStars ();
				});
			}
		});
	}
	$("#toggle-delete").on ("click", clearReview);
});

/* Expand review area */
function expand() {
	var elements = $("#input").children();
	$(elements[1]).removeClass ("hidden");
	$(elements[2]).removeClass ("minimized");
	$(elements[3]).children().first().removeClass ("hidden");
	
	elements[2].scrollIntoView ({behavior: "smooth", block: "center"});

	$("#input").off ("click", expand);
}

/* Draws star rating according to value of amt */
function selectStars (amt) {
	var stars = $("#input-stars .fa.fa-star");
	// Reset colors of stars
	for (var i = 0; i < 5; i++)
		$(stars[i]).addClass ("unchecked");
	// Set colors of stars specified
	for (var i = 0; i < amt; i++)
		$(stars[i]).removeClass ("unchecked");

	$("#input-rating").val (amt);
}

/* Draws star rating of session */
function drawStars () {
	var size = $("#session-rating").html ();
	var stars = $("#session-stars .fa.fa-star")
	for (var i = 0; i < size; i++) {
		$(stars[i]).removeClass ("unchecked");
	}
}

/* Enable submit button if review has content */
function enable_submit () {
	var rating = $("#input-stars .fa.fa-star")[0];
	var btn1 = $("#submit-new")[0];
	var btn2 = $("#submit-edit")[0];
	
	// Enable button if a rating is given (Even without text review)
	if (!($(rating).hasClass ("unchecked"))) {
		$(btn1).addClass ("clickable");
		$(btn1).removeClass ("clickable-disabled");
		btn1.disabled = false;
	}
	// Disable button
	else {
		$(btn1).removeClass ("clickable");
		$(btn1).addClass ("clickable-disabled");
		btn1.disabled = true;
	}
}

// REVIEW MANIPULATION
/* Opens edit section of review */
function open_edit () {
	$("#session-review-box").addClass ("hidden");
	$("#input").removeClass ("hidden");
	expand();
	$("#submit-new").addClass ("hidden");
	$("#submit-edit").removeClass ("hidden");

	// Copies given star rating
	var input = $("#input-stars .fa.fa-star");
	var rating = $("#session-stars .fa.fa-star");
	for (var i = 0; i < rating.length; i++)
		if (!($(rating[i]).hasClass ("unchecked")))
			$(input[i]).removeClass ("unchecked");
	
	// Sets session review as pre-placed values
	$("#input-rating").val ($("#session-rating").text ());
	$("#input-review").val ($("#session-review").html ());
}



/* UTILITY FUNCTIONS */
// Ref: https://stackoverflow.com/questions/10849421/textarea-empty-check
function trim(str) {
	return str.replace(/^\s+|\s+$/g,''); 
}