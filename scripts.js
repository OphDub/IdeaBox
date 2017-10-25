//Global Variables
var saveIdeaButton = document.querySelector('.save-button');
var deleteIdea = document.querySelector('.idea-delete');

//Event Listeners
saveIdeaButton.addEventListener('click', saveIdea);

//Functions
function IdeaCard (ideaTitle, ideaBody, ideaId, ideaQuality) {
	this.ideaTitle = ideaTitle,
	this.ideaBody = ideaBody,
	this.ideaId = ideaId;
	this.ideaQuality = ideaQuality || "swill";
};

//Save Idea to localStorage
function saveIdea () {
	var $ideaTitle = $('#idea-title-input').val();
	var $ideaBody = $('#idea-body').val();
	var $ideaId = Date.now();
	var $ideaQuality;
	var $newIdea = new IdeaCard($ideaTitle, $ideaBody, $ideaId, $ideaQuality);
	var $stringifiedIdea = JSON.stringify($newIdea);
	localStorage.setItem($ideaId, $stringifiedIdea);
	retrieveIdea($ideaId);
};

function retrieveIdea(e) {
	var retrievedIdea = localStorage.getItem(e);
	var parsedIdea = JSON.parse(retrievedIdea);
	displayIdeaCard(parsedIdea.ideaTitle, parsedIdea.ideaBody, parsedIdea.ideaId, parsedIdea.ideaQuality);
};

window.onload = function() {
	for(var i in localStorage)
	{
    retrieveIdea(i);
	}
};

function displayIdeaCard (ideaTitle, ideaBody, ideaId, ideaQuality) {
	var ideaWrapper = document.querySelector('.idea-wrapper');	
	var ideaCard = document.createElement('article');
	ideaCard.classList.add('idea-card');
	ideaCard.id = ideaId;
	ideaCard.innerHTML = 
		`<h2 class="idea-title-h2"> ${ideaTitle} </h2><button type="button" class="idea-delete"></button></h2>
		<p class="idea-body-text"> ${ideaBody} </p>
		<button class="upvote voting-buttons" type="button"></button>
		<button class="downvote voting-buttons" type="button"></button>
		<p class="idea-quality"> quality: <span class="idea-status">${ideaQuality}</span></p>`
	ideaWrapper.prepend(ideaCard);
	document.querySelector('form').reset();
}

//Delete Idea from DOM
$(document).on('click', function(){
	$('.idea-delete').click(function() {
		$(this).closest('article').remove();
	//Delete idea from localStorage
	var $ideaToBeRemoved = $(this).closest('article').attr('id');
	localStorage.removeItem($ideaToBeRemoved);
	});
});	

//Upvote Function

$(document).on('click', upVote);

function upVote () {
	//Event listener to retrieve correct ideaCard ID from localStorage and parse the object
	$('.upvote').click(function() {
		var $upvotedIdea = $(this).closest('article').attr('id');
		var $retrievedUpvotedIdea = localStorage.getItem($upvotedIdea);
		var $parsedUpvotedIdea = JSON.parse($retrievedUpvotedIdea);
	//Change idea quality of card
		if ($parsedUpvotedIdea['ideaQuality'] === "plausible") {
			$parsedUpvotedIdea['ideaQuality'] = "genius";
		};

		if($parsedUpvotedIdea['ideaQuality'] === "swill") {
			$parsedUpvotedIdea['ideaQuality'] = "plausible";
		};
	//Stringify changed ideaCard and setItem again in localStorage
		var $changedIdea = JSON.stringify($parsedUpvotedIdea);
		localStorage.setItem($upvotedIdea, $changedIdea);

	})
};	

//Downvote Function

$(document).on('click', downVote);

function downVote () {
	$('.downvote').click(function() {
		var $downvotedIdea = $(this).closest('article').attr('id');
		var $retrievedDownvotedIdea = localStorage.getItem($downvotedIdea);
		var $parsedDownvotedIdea = JSON.parse($retrievedDownvotedIdea);

		if($parsedDownvotedIdea['ideaQuality'] === "plausible") {
			$parsedDownvotedIdea['ideaQuality'] = "swill";
			console.log($changedIdea);
		};

		if($parsedDownvotedIdea['ideaQuality'] === "genius") {
			$parsedDownvotedIdea['ideaQuality'] = "plausible";
			console.log($changedIdea);
		};
	
		var $changedIdea = JSON.stringify($parsedDownvotedIdea);
		localStorage.setItem($downvotedIdea, $changedIdea);

	})
};
