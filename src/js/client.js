// coordinate init 

import range from 'lodash/range';

function checkHorizontal(yPosition,xPosition, coord, turn, step){
    const offset = xPosition + step;
    if(coord[yPosition][offset] === turn){
        return [yPosition, offset];
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
    if(offset > 7){
        return -1;
    }
    if(offset < 0){
        return -1;
    }
    if(coord[offset][xPosition] === turn){
        return [offset,xPosition];
      }
    else {
        return checkVertical(offset,xPosition, coord, turn, step)
    }
    
}

function checkDiagonalLR(yPosition,xPosition, coord, turn, step){
    const yOffset = yPosition + step;
    const xOffset = xPosition + step;
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
    const yOffset = yPosition + (step * -1);
    const xOffset = xPosition + step;
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
        
        state.coordinates[placeWhereClick[0]][placeWhereClick[2]] = state.coordinates[placeWhereClick[0]][placeWhereClick[2]] === 0 ? state.turnValue : state.coordinates[placeWhereClick[0]][placeWhereClick[2]];
        const right = checkHorizontal(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,1);
        const left = checkHorizontal(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,-1);
        const down = checkVertical(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,1);
        const up = checkVertical(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,-1);
        const diagonalUpLR = checkDiagonalLR(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,-1);
        const diagonalDownLR = checkDiagonalLR(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,1);
        const diagonalUpRL = checkDiagonalRL(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,1);
        const diagonalDownRl = checkDiagonalRL(parseInt(placeWhereClick[0]),parseInt(placeWhereClick[2]),state.coordinates,state.turnValue,-1);
        console.log("turnp de: " , turnValue);

        //shift right coins
        if(right != -1){
            const hRightPositions = range(parseInt(placeWhereClick[2]),right[1]+1);
            hRightPositions.forEach(element => {
                if(state.coordinates[placeWhereClick[0]][element] != 0){
                    state.coordinates[placeWhereClick[0]][element] = turnValue;
                }
            });   
       }
       //shift left coins
       if(left != -1){
        const hLeftPositions = range(left[1],parseInt(placeWhereClick[2])+1);
        hLeftPositions.forEach(element => {
            if(state.coordinates[placeWhereClick[0]][element] != 0){
                state.coordinates[placeWhereClick[0]][element] = turnValue;
            }
        });
       }
       
       //shift up coins
       if(up != -1){
        const vUpPositions = range(up[0],parseInt(placeWhereClick[0])+1);
        vUpPositions.forEach(element => {
            if(state.coordinates[element][placeWhereClick[2]] != 0){
                state.coordinates[element][placeWhereClick[2]] = turnValue;
            }
        }); 
       }

       //shift down coins
       if(down != -1){
        const vUpPositions = range(parseInt(placeWhereClick[0]),down[0]+1);
        vUpPositions.forEach(element => {
            if(state.coordinates[element][placeWhereClick[2]] != 0){
                state.coordinates[element][placeWhereClick[2]] = turnValue;
            }
        }); 
       }

       //shift diagonal coins


       if(diagonalUpLR != -1){
           const diagonalLRy = range(diagonalUpLR[0], parseInt(placeWhereClick[0])+1);
           const diagonalLRx = range(diagonalUpLR[1], parseInt(placeWhereClick[2]) +1);
           diagonalLRy.forEach((element , index) => {
               const xPos = diagonalLRx[index];
               if( state.coordinates[element][xPos] != 0){
                    state.coordinates[element][xPos] = turnValue;
                }
           }); 
       }

       //shift diagonal down coins
        
       if(diagonalDownLR != -1){
        const diagonalLRy = range(parseInt(placeWhereClick[0]), diagonalDownLR[0]+1);
        const diagonalLRx = range(parseInt(placeWhereClick[2]), diagonalDownLR[1] +1);
        diagonalLRy.forEach((element , index) => {
            const xPos = diagonalLRx[index];
            if(state.coordinates[element][xPos] != 0){
                state.coordinates[element][xPos] = turnValue;
            }
        }); 
    }

        //shift diagonal up coins *other side

        if(diagonalUpRL != -1){
            const diagonalLRy = range(diagonalUpRL[0]+1, parseInt(placeWhereClick[0]));
            const diagonalLRx = range(parseInt(placeWhereClick[2])+1, diagonalUpRL[1]);
            diagonalLRy.forEach((element , index) => {
                const xPos = diagonalLRx[index];
                if(state.coordinates[element][xPos] != 0){
                    state.coordinates[element][xPos] = turnValue;
                }
            }); 
        } 

        //shift diagonal down coins *other side

        if(diagonalDownRl != -1){
            const diagonalLRy = range(parseInt(placeWhereClick[0])+1, diagonalDownRl[0]); 
            const diagonalLRx = range(diagonalDownRl[1]+1, parseInt(placeWhereClick[2]));
            console.log("en y" , diagonalLRy);
            console.log("en x" , diagonalLRx);
            diagonalLRy.forEach((element , index) => {
                const xPos = diagonalLRx[index];
                if(state.coordinates[element][xPos] != 0){
                    state.coordinates[element][xPos] = turnValue;
                }
            }); 
        }

        state.turnValue = state.turnValue * -1;
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










