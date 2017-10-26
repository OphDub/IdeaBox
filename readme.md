# IdeaBox

Our project spec as assigned was to create an webpage that is able to accept user input for idea cards that are stored locally on the user's machine. This project also establishes some basic foundations for understanding interaction with user data in a limited scope. Each card is assigned a quality that is dynamic and can be changed by the user via an upvote/downvote. All cards should also persist on the page through reload. Users should also be able to make changes to each idea card and have the changes show dynamically without a page reload. Other project requirements are listed below.

## Project Requirements

Data Model for idea cards:
  *An Idea has an id, title, a body, and a quality.*
  *The id should be a unique identifier.*
  *title and body are free-form strings.*
  *quality should be one of the following: “genius”, “plausible”, and “swill.”*
  *By default, the idea’s “quality” should default to the lowest setting (i.e. “swill”).*

User Interaction:
  *User should be able to see all existing ideas, including the title, body, and quality for each idea.

  *Ideas should appear in descending chronological order (with the most recently created idea at the top).

  *When a user clicks “Save”:
    *A new idea with the provided title and body should appear in the idea list.
    *The text fields should be cleared and ready to accept a new idea.
    *The page should not reload.
    *The idea should be persisted. It should still be present upon reloading the page.

  *Deleting an existing idea:
    *Each idea in the list should have a link or button to “Delete” (or 𝗫).
    *Upon clicking “Delete”, the appropriate idea should be removed from the list.
    *The page should not reload when an idea is deleted.
    *The idea should be removed from localStorage. It should not re-appear on next page load.

  *Changing the quality of an idea:
    *Each idea in the list should include an “upvote” and “downvote” button.
    *Clicking upvote on the idea should increase its quality one notch (“swill” → “plausible”, “plausible” → “genius”).
    *Clicking downvote on the idea should decrease its quality one notch (“genius” → “plausible”, “plausible” → “swill”).
    *Incrementing a “genius” idea or decrementing a “swill” idea should have no effect.

 *Editing an existing idea:
   *When a user clicks the title or body of an idea in the list, text should become an editable text field, pre-populated with the existing idea title or body.
   *The user should be able to “commit” their changes by pressing “Enter/Return” or by clicking outside of the text field.
   *If the user reloads the page, their edits will be reflected.

  *Idea Filtering and Searching:
    *At the top of the idea list, include a text field labeled “Search”.
    *As a user types in the search box, the list of ideas should filter in real time to only display ideas whose title or body include the user’s text. 
    *The page should not reload. 
    *Clearing the search box should restore all the ideas to the list.

Page Layout:
  *On the application’s main page, a user should see:
  *Two text boxes for entering the “Title” and “Body” for a new idea.
  *“Save” button for committing that idea.

## Authors

* **Ricardo Viera** [rvwatch](https://github.com/rvwatch)
* **Ophus Wong** [ophdub](https://github.com/ophdub)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## Acknowledgments

* Turing FE Mod 2: Matt A, Thomas L, Matt R
* Turing FE Mod 1: Alex B, Jeff, Natalie, Parker


