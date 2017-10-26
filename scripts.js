//Global Variables
var saveIdeaButton = document.querySelector('.save-button');
var deleteIdea = document.querySelector('.idea-delete');

//Event Listeners
saveIdeaButton.addEventListener('click', saveIdea);
$('.idea-wrapper').on('click', voteDirection);

//Functions
//Idea Card Persistence Function
window.onload = function() {
	for(var i in localStorage)
	{
    retrieveIdea(i);
	}
};

function IdeaCard (ideaTitle, ideaBody, ideaId, ideaQuality) {
	this.ideaTitle = ideaTitle,
	this.ideaBody = ideaBody,
	this.ideaId = ideaId;
	this.ideaQuality = ideaQuality;
};

//Save Idea to localStorage
function saveIdea () {
	var $ideaTitle = $('#idea-title-input').val();
	var $ideaBody = $('#idea-body').val();
	var $ideaId = Date.now();
	var $ideaQuality = 'swill';
	var $newIdea = new IdeaCard($ideaTitle, $ideaBody, $ideaId, $ideaQuality);
	var $stringifiedIdea = JSON.stringify($newIdea);
	localStorage.setItem($ideaId, $stringifiedIdea);
	retrieveIdea($ideaId);
};

function retrieveIdea(e) {
	var retrievedIdea = localStorage.getItem(e);
	var parsedIdea = JSON.parse(retrievedIdea);
	displayIdeaCard(parsedIdea['ideaTitle'], parsedIdea['ideaBody'], parsedIdea['ideaId'], parsedIdea['ideaQuality']);
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

// Voting Functions
function voteDirection (e) {
	if ($(e.target).hasClass('upvote')) {
		upVote(e.target);
	} else if ($(e.target).hasClass('downvote')) {
		downVote(e.target);
	}
};

//upVote
function upVote (e) {
	//Event listener to retrieve correct ideaCard ID from localStorage and parse the object
	var $upvotedIdea = $(e).closest('article').attr('id');
	var $retrievedUpvotedIdea = localStorage.getItem($upvotedIdea);
	var $parsedUpvotedIdea = JSON.parse($retrievedUpvotedIdea);
	//Change idea quality of card
	if ($parsedUpvotedIdea['ideaQuality'] === "swill") {
		$parsedUpvotedIdea['ideaQuality'] = "plausible";
	} else if($parsedUpvotedIdea['ideaQuality'] === "plausible") {
		$parsedUpvotedIdea['ideaQuality'] = "genius";
	};
	//Stringify changed ideaCard and setItem again in localStorage
	$(e).closest('article').find('.idea-status').text($parsedUpvotedIdea['ideaQuality']);
	var $changedIdea = JSON.stringify($parsedUpvotedIdea);
	localStorage.setItem($upvotedIdea, $changedIdea);
};	

//Downvote
function downVote (e) {
	//Event listener to retrieve correct ideaCard ID from localStorage and parse the object
	var $downvotedIdea = $(e).closest('article').attr('id');
	var $retrievedDownvotedIdea = localStorage.getItem($downvotedIdea);
	var $parsedDownvotedIdea = JSON.parse($retrievedDownvotedIdea);
	//Change idea quality of card	
	if($parsedDownvotedIdea['ideaQuality'] === "genius") {
		$parsedDownvotedIdea['ideaQuality'] = "plausible";
	} else if ($parsedDownvotedIdea['ideaQuality'] === "plausible") {
		$parsedDownvotedIdea['ideaQuality'] = "swill";
	};
	//Stringify changed ideaCard and setItem again in localStorage	
	$(e).closest('article').find('.idea-status').text($parsedDownvotedIdea['ideaQuality']);
	var $changedIdea = JSON.stringify($parsedDownvotedIdea);
	localStorage.setItem($downvotedIdea, $changedIdea);
};
