//Global Variables
var ideaTitle = document.getElementById('idea-title-input');
var ideaBody = document.getElementById('idea-body');
var saveIdeaButton = document.querySelector('.save-button');

//Event Listeners
saveIdeaButton.addEventListener('click', appendIdeaCard);

//Functions
function appendIdeaCard () {
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
	document.querySelector('form').reset();
	ideaTitle.focus();
};

//Remove Idea Card
$(document).on('click', function(){
	$('.idea-delete').click(function() {
	$(this).closest('article').remove();
	});
});

//Constructor Function - appendIdeaCard
 