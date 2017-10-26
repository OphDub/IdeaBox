//Global Variables
var saveIdeaButton = document.querySelector('.save-button');
var deleteIdea = document.querySelector('.idea-delete');

//Event Listeners
saveIdeaButton.addEventListener('click', saveIdea);

//Functions
function IdeaCard (ideaTitle, ideaBody, ideaId) {
	this.ideaTitle = ideaTitle,
	this.ideaBody = ideaBody,
	this.ideaId = ideaId;
	this.ideaQuality = "swill";
};

//Save Idea to localStorage
function saveIdea () {
	var $ideaTitle = $('#idea-title-input').val();
	var $ideaBody = $('#idea-body').val();
	var $ideaId = Date.now();
	var $newIdea = new IdeaCard($ideaTitle, $ideaBody, $ideaId);
	var $stringifiedIdea = JSON.stringify($newIdea);
	localStorage.setItem($ideaId, $stringifiedIdea);
	retrieveIdea($ideaId);
};

function saveBody (id, ideaBody) {
	var retrieved = localStorage.getItem(id);
	var parsed = JSON.parse(retrieved);
	parsed.ideaBody = ideaBody;
	var stringBody = JSON.stringify(parsed);
	localStorage.setItem(id, stringBody);
};

function saveTitle (id, ideaTitle) {
	var retrieved = localStorage.getItem(id);
	var parsed = JSON.parse(retrieved);
	parsed.ideaTitle = ideaTitle;
	var stringTitle = JSON.stringify(parsed);
	localStorage.setItem(id, stringTitle);
};



function retrieveIdea(e) {
	var retrievedIdea = localStorage.getItem(e);
	var parsedIdea = JSON.parse(retrievedIdea);
	displayIdeaCard(parsedIdea.ideaTitle, parsedIdea.ideaBody, parsedIdea.ideaId);
};

window.onload = function() {
	for(var i in localStorage)
	{
    retrieveIdea(i);
	}
};

//Change text on inputs

$('.idea-wrapper').on('click', '.idea-title', function() {
    $(this).attr('contenteditable','true').addClass('edit-title').focus();
    var $editThis = $(this).closest('article').attr('id');

    $(this).keyup(function() {
    	var $newTitle = $(this).text();
    	saveTitle ($editThis, $newTitle);
		});

		$(this).on('blur', function(){
				$(this).removeClass('edit-title');
		});
});


$('.idea-wrapper').on('click', '.idea-body-text', function() {
    $(this).attr('contenteditable','true').addClass('edit-body').focus();
    var editThis = $(this).closest('article').attr('id');
    $(this).keyup(function() {
    	var newBody = $(this).text();
    	saveBody(editThis, newBody);
		});

		$(this).on('blur', function(){
				$(this).removeClass('edit-body');
		});
});



//Change text on inputs

function displayIdeaCard (ideaTitle, ideaBody, ideaId) {
	var ideaWrapper = document.querySelector('.idea-wrapper');	
	var ideaCard = document.createElement('article');
	ideaCard.classList.add('idea-card');
	ideaCard.id = ideaId;
	ideaCard.innerHTML = 
		`<h2 class="idea-title"> ${ideaTitle} </h2>
		<button type="button" class="idea-delete"></button>
		<p class="idea-body-text"> ${ideaBody} </p>
		<button class="upvote voting-buttons" type="button"></button>
		<button class="downvote voting-buttons" type="button"></button>
		<p class="idea-quality"> quality: <span class="idea-status">swill</span></p>`
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
		var $retrievedUpVotedIdea = localStorage.getItem($upvotedIdea);
		var $parsedUpvotedIdea = JSON.parse($retrievedUpVotedIdea);
		
		if($parsedUpvotedIdea['ideaQuality'] == "swill"){
			console.log($parsedUpvotedIdea.ideaQuality + ' cl 1')
			$parsedUpvotedIdea['ideaQuality'] == "plausible";
		} else if ($parsedUpvotedIdea['ideaQuality'] == "plausible") {
			console.log($parsedUpvotedIdea.ideaQuality + ' cl 2')
			$parsedUpvotedIdea['ideaQuality'] == "genius";
		}
		


	});
	//If Conditional to change ideaQuality value of the object
};	
