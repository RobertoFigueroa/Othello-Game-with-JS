// coordinate init 

const coordinates = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,1,-1,0,0,0],
    [0,0,0,-1,1,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
];

const renderCoin = (colorValue) => {
    const coin = document.createElement('div');
    coin.style.width = "100px";
    coin.style.height = "100px";
    coin.style.borderRadius = "50px";   
    coin.style.backgroundColor = colorValue===1 ? 'white' : colorValue===-1 ? 'black' : 'gray';
    coin.style.opacity = '1';
    return coin;
};

const renderCell = ({
    x,
    y,
    yVal : colorState
    }) => {
        const cell = document.createElement('div');
        cell.style.width = "100px";
        cell.style.height = "100px";
        cell.style.backgroundColor = "gray";
        cell.style.border = '1px solid black';
        cell.className = `${x}-${y}`;
        console.log(colorState);
        cell.appendChild(renderCoin(colorState));
        cell.onclick = (elm) => {
            elm.target.appendChild(renderCoin(1));
        };
        return cell;
    };

const render = (mount, state) => {
    const {turnValue} = state;
    //board creation
    const board = document.createElement('div');
    board.style.height = '816px';
    board.style.width = '816px';
    board.style.display = 'flex';
    board.style.flexDirection = 'row';
    board.style.flexWrap = 'wrap';
    board.style.backgroundColor = 'black';
    root.appendChild(board);

    //cells creation 
    coordinates.map((xVal,i) => {
        xVal.map((yVal,j) => {
            board.appendChild(renderCell({i,j,turnValue}));
            
        });
    });



};

const APP_STATE = {
    turnValue : 1
}

const root = document.getElementById('root');
render (root, APP_STATE);







