# Othello Game with JS 


This is a practice for learn more about JS and render functions. 

The game called Othello is an strategy game which you have to find out the way to shift the most coins you can with some rules.

## Rules
- [x] Black must place a black disc on the board, in such a way that there is at least one straight (horizontal, vertical, or diagonal) occupied line between the new disc and another black disc, with one or more contiguous white pieces between them. 

![alt initial](https://github.com/RobertoFigueroa/Othello-Game-with-JS/blob/master/src/img/initialBoard.png)

- [x] After placing the disc, Black flips all white discs lying on a straight line between the new disc and any existing black discs. All flipped discs are now black. If Black decides to place a disc in the topmost location, one white disc gets flipped, and the board now looks like this:

![alt movement](https://github.com/RobertoFigueroa/Othello-Game-with-JS/blob/master/src/img/movement1.png)

- [x] The player with the most discs on the board at the end of the game wins. If both players have the same number of discs, then the game is a draw. 

![alt winner](https://github.com/RobertoFigueroa/Othello-Game-with-JS/blob/master/src/img/Winner.png)


## Try it 
**Instructions for Ubuntu**

You have to install some of this package managers:

-npm
-yarn

In my case I use yarn

Now, you'll have to fork or clone this repo and open your command line in the directory that is located this project, the you have to execute this commands:

```
yarn install  
```

then

```
yarn dev  
```

finally type in your browser :

```
localhost:8080
```

And that's all, enjoy the game and develop.

## Reference

[Here](https://www.eothello.com/) I got the rules of the game.

