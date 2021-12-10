function movementButtons() {
    let buttonContainer = $('<div class="test"></div>')

    buttonContainer.append("<button id ='up'>Up</button>")
    buttonContainer.append("<button id ='right'>Right</button>")
    buttonContainer.append("<button id ='down'>Down</button>")
    buttonContainer.append("<button id='left'>Left</button>")

    $(".buttons").append(buttonContainer)

    $("#up").on('click', () => {
        let occupiedTile = $("#occupied")
        // Tracked info used to decide where the player will appear on the map when new maps are generated
        lastDirection = 'up';
        trackOccupiedTile()
        // Find current row
        let occupiedRow = findTileLocation(occupiedTile.parent().attr('class'))
        // Find current column
        let occupiedColumn = findTileLocation(occupiedTile.attr('class'))
        if (onExitTile()) {
            // Exits tile
            exitMap('exit', 'up');
        }
        if (onEntranceTile()) {
            exitMap('entrance', 'up');
        }
        // Check if upper tile is active
        if (checkValidMovement(occupiedRow, occupiedColumn, 'up')) {
            console.log("Movement Successful");
            // Adds in the title for the area and a description
            assignText();
        } else {
            console.log("Movement Invalid")
        }

    })
    $("#right").on('click', () => {
        let occupiedTile = $("#occupied")
        lastDirection = 'right';
        trackOccupiedTile()
        // Find current row
        let occupiedRow = findTileLocation(occupiedTile.parent().attr('class'))
        // Find current column
        let occupiedColumn = findTileLocation(occupiedTile.attr('class'))

        // Checks if the player is current on an exit tile
        if (onExitTile()) {
            // Exits tile
            exitMap('exit', 'right');
        }
        if (onEntranceTile()) {
            exitMap('entrance', 'right');
        }
        // Check if right tile is active
        if (checkValidMovement(occupiedRow, occupiedColumn, 'right')) {
            console.log("Movement Successful");
            // Adds in the title for the area and a description
            assignText();
        } else {
            console.log("Movement Invalid")
        }

    })
    $("#down").on('click', () => {
        let occupiedTile = $("#occupied")
        lastDirection = 'down';
        trackOccupiedTile()
        // Find current row
        let occupiedRow = findTileLocation(occupiedTile.parent().attr('class'))
        // Find current column
        let occupiedColumn = findTileLocation(occupiedTile.attr('class'))

        // Checks if the player is current on an exit tile
        if (onExitTile()) {
            // Exits tile
            exitMap('exit', 'down');
        }
        if (onEntranceTile()) {
            exitMap('entrance', 'down');
        }
        // Check if bottom tile is active
        if (checkValidMovement(occupiedRow, occupiedColumn, 'down')) {
            console.log("Movement Successful");
            // Adds in the title for the area and a description
            assignText();
        } else {
            console.log("Movement Invalid")
        }

    })
    $("#left").on('click', () => {
        let occupiedTile = $("#occupied")
        lastDirection = 'left';
        trackOccupiedTile()
        // Find current row
        let occupiedRow = findTileLocation(occupiedTile.parent().attr('class'))
        // Find current column
        let occupiedColumn = findTileLocation(occupiedTile.attr('class'))

        // Checks if the player is current on an exit tile
        if (onExitTile()) {
            // Exits tile
            exitMap('exit', 'left');
        }
        if (onEntranceTile()) {
            exitMap('entrance', 'left');
        }
        // Check if left tile is active
        if (checkValidMovement(occupiedRow, occupiedColumn, 'left')) {
            console.log("Movement Successful");
            // Adds in the title for the area and a description
            assignText();
        } else {
            console.log("Movement Invalid")
        }
    })
}

function findTileLocation(string) {
    var regex = /\d+/g;
    return string.match(regex);
}

function checkValidMovement(row, column, direction) {
    if (direction === 'up') {
        let nextRow = parseInt(row) - 1;
        // Checks if the row is valid
        if ($(`.mapRow${nextRow}`) !== undefined) {
            if ($(`.mapRow${nextRow}`).children(`.mapCol${column}`).attr('id') === 'active') {
                // Moves the character
                $(`.mapRow${nextRow}`).children(`.mapCol${column}`).attr('id', 'occupied')
                $(`.mapRow${row}`).children(`.mapCol${column}`).attr('id', 'active')
                return true
            } else {
                return false
            }
        }
    } else if (direction === 'right') {
        let nextCol = parseInt(column) + 1;
        // Checks if the row is valid
        if ($(`.mapCol${nextCol}`) !== undefined) {
            if ($(`.mapRow${row}`).children(`.mapCol${nextCol}`).attr('id') === 'active') {
                // Moves the character
                $(`.mapRow${row}`).children(`.mapCol${nextCol}`).attr('id', 'occupied')
                $(`.mapRow${row}`).children(`.mapCol${column}`).attr('id', 'active')
                return true
            } else {
                return false
            }
        }
    } else if (direction === 'left') {
        let nextCol = parseInt(column) - 1;
        // Checks if the row is valid
        if ($(`.mapCol${nextCol}`) !== undefined) {
            if ($(`.mapRow${row}`).children(`.mapCol${nextCol}`).attr('id') === 'active') {
                // Moves the character
                $(`.mapRow${row}`).children(`.mapCol${nextCol}`).attr('id', 'occupied')
                $(`.mapRow${row}`).children(`.mapCol${column}`).attr('id', 'active')
                return true
            } else {
                return false
            }
        }

    } else if (direction === "down") {
        let nextRow = parseInt(row) + 1;
        // Checks if the row is valid
        if ($(`.mapRow${nextRow}`) !== undefined) {
            if ($(`.mapRow${nextRow}`).children(`.mapCol${column}`).attr('id') === 'active') {
                // Moves the character
                $(`.mapRow${nextRow}`).children(`.mapCol${column}`).attr('id', 'occupied')
                $(`.mapRow${row}`).children(`.mapCol${column}`).attr('id', 'active')
                return true
            } else {
                return false
            }
        }

    } else {
        console.log("Please input a direction");
    }
}

function onExitTile() {
    let occupiedTile = $("#occupied")
    // Find current row
    let occupiedRow = findTileLocation(occupiedTile.parent().attr('class'))
    // Find current column
    let occupiedColumn = findTileLocation(occupiedTile.attr('class'))

    for (let i = 0; i < currentMap.length; i++) {
        // Checks if the occupied tile is an exit
        if (currentMap[i].row === parseInt(occupiedRow) && currentMap[i].col === parseInt(occupiedColumn) && currentMap[i].exitPoint === true) {
            return true
        } else {
            return false;
        }
    }
}

function onEntranceTile() {
    let occupiedTile = $("#occupied")
    // Find current row
    let occupiedRow = findTileLocation(occupiedTile.parent().attr('class'))
    // Find current column
    let occupiedColumn = findTileLocation(occupiedTile.attr('class'))

    for (let i = 0; i < currentMap.length; i++) {
        // Checks if the occupied tile is an exit
        if (currentMap[i].row === parseInt(occupiedRow) && currentMap[i].col === parseInt(occupiedColumn) && currentMap[i].entrance === true) {
            return true
        } else {
            return false;
        }
    }
}

function exitMap(method, direction) {
    let occupiedTile = $("#occupied")
    // Find current row
    let occupiedRow = findTileLocation(occupiedTile.parent().attr('class'))
    // Find current column
    let occupiedColumn = findTileLocation(occupiedTile.attr('class'))

    for (let i = 0; i < currentMap.length; i++) {
        if (currentMap[i].row === parseInt(occupiedRow) && currentMap[i].col === parseInt(occupiedColumn)) {
            // Checks if the player is travelling in the exit direction
            if (currentMap[i].exitDirection === direction && method === 'exit') {
                nextMap('exit')
            } else if (currentMap[i].exitDirection === direction && method === 'entrance') {
                nextMap('entrance')
            } else {
                return console.log("No exit here");
            }
        }
    }
}

function nextMap(direction) {
    if (direction === 'exit') {
        destroyMap();
        createMapTiles(5, 5);
        colourMap(currentMap[currentMap.length - 1].exit);
    } else {
        destroyMap();
        createMapTiles(5, 5);
        colourMap(currentMap[currentMap.length - 1].entrance);
    }
}

function trackOccupiedTile() {
    let occupiedTile = $("#occupied")
    // Find current row
    let occupiedRow = findTileLocation(occupiedTile.parent().attr('class'))
    // Find current column
    let occupiedColumn = findTileLocation(occupiedTile.attr('class'))
    if (gameStarted) {
        trackedLocation = [parseInt(occupiedRow), parseInt(occupiedColumn), lastDirection]
    }
}