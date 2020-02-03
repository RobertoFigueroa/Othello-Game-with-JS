// coordinate init 
//TODO
const blackInitialValues = [{4:4},{3:3}];
const whiteInitialValues = [{4:3},{3:4}];

function sayHello(elm) {
    return 1;
};

const coordinates = [];
let xIndex = 0;
for(var i = 0; i<64; i++){
    if(i % 8 === 0 & i != 0){
        xIndex += 1;
    }
    coordinates.push({x:xIndex, y:i%8});
}


const root = document.getElementById('root');
const board = document.createElement('div');
board.style.height = '816px';
board.style.width = '816px';
board.style.display = 'flex';
board.style.flexDirection = 'row';
board.style.flexWrap = 'wrap';
board.style.backgroundColor = 'black';
root.appendChild(board);

const renderCoin = (color) => {
    const coin = document.createElement('div');
    coin.style.width = "100px";
    coin.style.height = "100px";
    coin.style.borderRadius = "50px";   
    coin.style.backgroundColor = color;
    coin.style.opacity = '1';
    return coin;
};  

const renderCell = ({x , y }) => {
    const cell = document.createElement('div');
    cell.style.width = "100px";
    cell.style.height = "100px";
    //TODO ADD LODASH COMPARISON FOR SET THE INITIAL COINS
    cell.style.backgroundColor = "gray";
    cell.style.border = '1px solid black';
    cell.className = `${x}-${y}`;
    
    cell.onclick = (elm) => {
        elm.target.appendChild(renderCoin('red'));  
    };
    return cell;

};

coordinates.map((val) => {
    board.appendChild(renderCell(val));
});







