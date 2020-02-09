#Othello-Game

This is a practice for learn more about JS and render functions. 

The game called Othello is an stragy game which you have to find out the way to collect or shift the most coins you can with some rules.

**Rules**

- [x] Black must place a black disc on the board, in such a way that there is at least one straight (horizontal, vertical, or diagonal) occupied line between the new disc and another black disc, with one or more contiguous white pieces between them. 

src/img/initialBoard.png

- [x] After placing the disc, Black flips all white discs lying on a straight line between the new disc and any existing black discs. All flipped discs are now black. If Black decides to place a disc in the topmost location, one white disc gets flipped, and the board now looks like this:

src/img/movement1.png

- [x] The player with the most discs on the board at the end of the game wins. If both players have the same number of discs, then the game is a draw. 

src/img/Winner.png