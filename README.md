# Solution

When the user initially visits the app he should see a list of variables and a tree graph representing the data (campaign, feed exports a additional sources).
The custom variables have slightly purple text and default variables are gray.
When user clicks on a variable in the list it will highlight and at the same time the data item that is using this variable will also receive a purple marker.
When user clicks again on the same variable it will unmark the data item and remove the highlight.
When user clicks on a data item that is using any variables it will receive a purple mark and the used variables will be highlighted and moved to the start of the list.
When user clicks again on the same data item the app will be restored to initial state.