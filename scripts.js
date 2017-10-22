//Global Variables
var saveIdeaButton = document.querySelector('.save-button');
var deleteIdea = document.querySelector('.idea-delete');

//Event Listeners
saveIdeaButton.addEventListener('click', appendIdeaCard);

//Functions
function IdeaCard (ideaTitle, ideaBody) {
	this.ideaTitle = ideaTitle,
	this.ideaBody = ideaBody,
	// this.ideaQuality = ideaQuality || 'swill',
	this.ideaId = Date.now();
};
//Save Idea to localStorage
function saveIdea () {
	var $ideaTitle = $('#idea-title-input').val();
	var $ideaBody = $('#idea-body').val();
	var $newIdea = new IdeaCard($ideaTitle, $ideaBody);
	var $stringifiedIdea = JSON.stringify($newIdea);
	localStorage.setItem(Date.now(),$stringifiedIdea);
	console.log($stringifiedIdea);
	console.log(localStorage);
};

function showIdea () {
	var retrievedIdea = localStorage.getItem(Date.now());
	var parsedIdea = JSON.parse(retrievedIdea);
	console.log(parsedIdea);
}

function appendIdeaCard (ideaTitle, ideaBody) {
	var ideaTitle = document.getElementById('idea-title-input');
	var ideaBody = document.getElementById('idea-body');
	var ideaWrapper = document.querySelector('.idea-wrapper');	
	var ideaCard = document.createElement('article');
	ideaCard.classList.add('idea-card');
	ideaCard.innerHTML = 
		`<h2 class="idea-title-h2"> ${ideaTitle.value} <button type="button" class="idea-delete"></button></h2>
		<p class="idea-body-text"> ${ideaBody.value} </p>
		<button class="upvote voting-buttons" type="button"></button>
		<button class="downvote voting-buttons" type="button"></button>
		<p class="idea-quality"> quality: <span class="idea-status">swill</span></p>`
	ideaWrapper.prepend(ideaCard);
	saveIdea();
	document.querySelector('form').reset();
}

//Delete Idea
$(document).on('click', function(){
	$('.idea-delete').click(function() {
	$(this).closest('article').remove();
	});
});
