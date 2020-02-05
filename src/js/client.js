// coordinate init 

function checkHorizontal(app_state){
    app_state.coordinates.map((val, i) => {
        let intial = false;
        let end = false;
        const elementsToChange = []
        val.map((hVal,j) => {
            if(hVal != app_state.turnValue){
                elementsToChange.push([i,j]);
            }
            else {
                if(intial == false){
                    intial = true;
                }
                else {
                    end = true;
                }
            }
        });
        elementsToChange.map((listVal, x) =>{
            listVal.map ((coinVal, y) =>{
                app_state.coordinates[x][y] = app_state.turnValue;
            });
        });
    });

}

const renderCoin = (colorValue) => {
    const coin = document.createElement('div');
    coin.style.width = "100px";
    coin.style.height = "100px";
    coin.style.borderRadius = "50px";   
    coin.style.backgroundColor = colorValue===1 ? 'white' : colorValue===-1 ? 'black' : 'gray';
    return coin;
};

const renderCell = ({
    i: x,
    j: y,
    yVal : colorState
    }) => {
        const cell = document.createElement('div');
        cell.style.width = "100px";
        cell.style.height = "100px";
        cell.style.backgroundColor = "gray";
        cell.style.border = '1px solid black';
        cell.className = `${x}-${y}`;
        cell.appendChild(renderCoin(colorState));
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
    mount.appendChild(board);

    //cells creation 
    state.coordinates.map((xVal,i) => {
        xVal.map((yVal,j) => {
            board.appendChild(renderCell({i,j,yVal}));
            
        });
    });

    root.onclick = (elm) => {
        const placeWhereClick = elm.originalTarget.parentElement.className;
        console.log(state.coordinates);
        state.turnValue = state.turnValue * -1;
        state.coordinates[placeWhereClick[0]][placeWhereClick[2]] = state.coordinates[placeWhereClick[0]][placeWhereClick[2]] === 0 ? state.turnValue : state.coordinates[placeWhereClick[0]][placeWhereClick[2]];
        checkHorizontal(APP_STATE);
        root.innerHTML = '';
        render(root,APP_STATE);
    };
    

};

const APP_STATE = {
    turnValue : -1,
    coordinates : [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,1,-1,0,0,0],
        [0,0,0,-1,1,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
    ]
}

const root = document.getElementById('root');
render (root, APP_STATE);







