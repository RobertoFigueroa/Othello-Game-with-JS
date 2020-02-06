// coordinate init 

function checkHorizontal(yPosition,xPosition, coord, turn, step){
    const offset = xPosition + step;
    if(coord[yPosition][offset] === turn){
        return offset;
    }
    else if (xPosition > 7) {
        return -1;
    }
    else if(xPosition < 0){
        return -1;
    }
    else {
        return checkHorizontal(yPosition,offset, coord, turn, step);
    }

}

function checkVertical(yPosition,xPosition, coord, turn, step){
    const offset = yPosition + step;
    console.log(typeof(turn));
    if(offset > 7){
        return -1;
    }
    if(offset < 0){
        return -1;
    }
    if(coord[offset][xPosition] === turn){
        return offset;
      }
    else {
        return checkVertical(offset,xPosition, coord, turn, step)
    }
    
}

function checkDiagonalLR(yPosition,xPosition, coord, turn, step){
    const xOffset = yPosition + step;
    const yOffset = xPosition + step;
    if(xOffset < 0 || yOffset < 0){
        return -1;
    }
    if(xOffset > 7 || yOffset > 7){
        return -1;
    }
    if(coord[yOffset][xOffset] === turn){
        return [yOffset, xOffset];
    }
    else {
        return checkDiagonalLR(yOffset,xOffset, coord, turn, step);
    }

}

function checkDiagonalRL(yPosition,xPosition, coord, turn, step){
    const xOffset = yPosition + step;
    const yOffset = xPosition + (step * -1);
    console.log(yOffset , xOffset);
    if(xOffset < 0 || yOffset < 0){
        return -1;
    }
    if(xOffset > 7 || yOffset > 7){
        return -1;
    }
    if(coord[yOffset][xOffset] === turn){
        return [yOffset, xOffset];
    }
    else {
        return checkDiagonalRL(yOffset,xOffset, coord, turn, step);
    }

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
        state.turnValue = state.turnValue * -1;
        state.coordinates[placeWhereClick[0]][placeWhereClick[2]] = state.coordinates[placeWhereClick[0]][placeWhereClick[2]] === 0 ? state.turnValue : state.coordinates[placeWhereClick[0]][placeWhereClick[2]];
        const right = checkHorizontal(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,1);
        const left = checkHorizontal(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,-1);
        const up = checkVertical(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,1);
        const down = checkVertical(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,-1);
        const diagonalUpLR = checkDiagonalLR(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,-1);
        const diagonalDownLR = checkDiagonalLR(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,1);
        const diagonalUpRL = checkDiagonalRL(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,1);
        const diagonalDownRl = checkDiagonalRL(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,-1);
        // console.log(right);
        // console.log(left);
        // console.log(up);
        // console.log(down);
        // console.log(diagonalUpLR);
        // console.log(diagonalDownLR);
        console.log(diagonalUpRL);
        // console.log(diagonalDownRl);
        root.innerHTML = '';
        render(root,APP_STATE);
    };


};

const APP_STATE = {
    turnValue : 1,
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










