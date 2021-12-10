let mapLoc = $(".mapArea");
let currentMap = [];
let gameStarted = false;

let testTiles = [{
        row: 1,
        col: 5,
        name: "Tutorial Room",
        description: "Where we torture you with useless information room",
        exitPoint: true,
        exitDirection: 'right',
    },
    {
        row: 2,
        col: 2,
        name: "Tutorial Room 2",
        description: "Where we leave you to suffer for all eternity"
    },
    {
        row: 2,
        col: 3,
        name: "Tutorial Room 3",
        description: "Where we leave you to suffer for all eternity"
    },
    {
        row: 2,
        col: 4,
        name: "Tutorial Room 4",
        description: "Where we leave you to suffer for all eternity"
    },
    {
        row: 2,
        col: 5,
        name: "Tutorial Room 5",
        description: "Where we leave you to suffer for all eternity",
        startingPoint: true
    }
]

let testTiles3 = [{
        row: 1,
        col: 1,
        name: "Another Tutorial Room",
        description: "Haha, bet you thought you managed to escape the tutorial, jokes on you. You're stuck here",
        exitPoint: true,
        exitDirection: 'left',
        startingPoint: true,
    },
    {
        row: 2,
        col: 1,
        name: "Tutorial Hallway",
        description: "Where we leave you to suffer for all eternity"
    },
    {
        row: 2,
        col: 2,
        name: "Tutorial Hallway",
        description: "Where we leave you to suffer for all eternity"
    },
    {
        row: 2,
        col: 3,
        name: "Tutorial Hallway",
        description: "Where we leave you to suffer for all eternity"
    },
    {
        row: 2,
        col: 4,
        name: "The truth",
        description: "As this is a test component, there is no escape",
    }
]

let testTiles2 = [{
        row: 1,
        col: 1,
        name: "Another Tutorial Room",
        description: "Haha, bet you thought you managed to escape the tutorial, jokes on you. You're stuck here",
        entrance: true,
        exitDirection: 'left',
        startingPoint: true,
    },
    {
        row: 2,
        col: 1,
        name: "Tutorial Hallway",
        description: "Where we leave you to suffer for all eternity"
    },
    {
        row: 2,
        col: 2,
        name: "Tutorial Hallway",
        description: "Where we leave you to suffer for all eternity"
    },
    {
        row: 2,
        col: 3,
        name: "Tutorial Hallway",
        description: "Where we leave you to suffer for all eternity"
    },
    {
        row: 2,
        col: 4,
        name: "The truth",
        description: "As this is a test component, there is no escape",
    }
]


testTiles.push({
    exit: testTiles2
});
testTiles2.push({
    entrance: testTiles,
    exit: testTiles3
});

function createMapTiles(columns, rows) {
    let mapGrid = $("<div id='map-grid'></div>");

    // Creates the rows of the map
    for (let i = 0; i < rows; i++) {
        // The classes will later be used to identify the area where the player is in and where they'll be able to move
        let row = $(`<div class='mapRow${i + 1}'></div>`)
        // Create the columns for the map
        for (let j = 0; j < columns; j++) {
            let col = $(`<div class='mapCol${j + 1} mapTile' id="inactive"></div>`)
            row.append(col);
        }
        // Sends rows to the grid
        mapGrid.append(row);
    }
    // Makes the grid visible
    mapLoc.append(mapGrid);

    console.log("Map grid completed")
}


// Self-Explanatory
function destroyMap() {
    $("#map-grid").remove();
}

// Shows what tiles are available for the player to traverse
function colourMap(activeTiles) {
    currentMap = activeTiles;
    for (let i = 0; i < activeTiles.length; i++) {

        $(`.mapRow${activeTiles[i].row}`).children(`.mapCol${activeTiles[i].col}`).attr('id', 'active');

        // Assigns tile as an exitPoint
        if (activeTiles[i].exitPoint) {
            $(`.mapRow${activeTiles[i].row}`).children(`.mapCol${activeTiles[i].col}`).addClass('exit');
            if (activeTiles[i].exitDirection === 'up') {
                $(`.mapRow${activeTiles[i].row}`).children(`.mapCol${activeTiles[i].col}`).addClass('up');
            }
            if (activeTiles[i].exitDirection === 'right') {
                $(`.mapRow${activeTiles[i].row}`).children(`.mapCol${activeTiles[i].col}`).addClass('right');
            }
            if (activeTiles[i].exitDirection === 'left') {
                $(`.mapRow${activeTiles[i].row}`).children(`.mapCol${activeTiles[i].col}`).addClass('left');
            }
            if (activeTiles[i].exitDirection === 'down') {
                $(`.mapRow${activeTiles[i].row}`).children(`.mapCol${activeTiles[i].col}`).addClass('down');
            }
        }
        // Assigns tile as an entry point
        if (activeTiles[i].entrance) {
            $(`.mapRow${activeTiles[i].row}`).children(`.mapCol${activeTiles[i].col}`).addClass('entrance');
            if (activeTiles[i].exitDirection === 'up') {
                $(`.mapRow${activeTiles[i].row}`).children(`.mapCol${activeTiles[i].col}`).addClass('up');
            }
            if (activeTiles[i].exitDirection === 'right') {
                $(`.mapRow${activeTiles[i].row}`).children(`.mapCol${activeTiles[i].col}`).addClass('right');
            }
            if (activeTiles[i].exitDirection === 'left') {
                $(`.mapRow${activeTiles[i].row}`).children(`.mapCol${activeTiles[i].col}`).addClass('left');
            }
            if (activeTiles[i].exitDirection === 'down') {
                $(`.mapRow${activeTiles[i].row}`).children(`.mapCol${activeTiles[i].col}`).addClass('down');
            }
        }
        if (activeTiles[i].startingPoint && !gameStarted) {
            $(`.mapRow${activeTiles[i].row}`).children(`.mapCol${activeTiles[i].col}`).attr('id', 'occupied');
        }
    }

    // Assigns which tile will be occupied based on where the player was on the previous map
    if (gameStarted) {
        console.log(`Tracked Location is ${trackedLocation}`);
        if (trackedLocation[2] === 'up') {
            // Grabs the last row of the next map
            let row = parseInt(findTileLocation($('#map-grid').children().last().attr('class')))
            // Ensures that the tile is valid before changing it
            if ($(`.mapRow${row}`).children(`.mapCol${trackedLocation[1]}`).attr('id') === 'active') {
                $(`.mapRow${row}`).children(`.mapCol${trackedLocation[1]}`).attr('id', 'occupied');
            } else {
                // Error Message
                console.log(`Tile invalid. Please review map ${currentMap}`)
            }
        } else if (trackedLocation[2] === 'down') {
            // Grabs the first row of the next map
            let row = parseInt(findTileLocation($('#map-grid').children().first().attr('class')))
            // Ensures that the tile is valid before changing it
            if ($(`.mapRow${row}`).children(`.mapCol${trackedLocation[1]}`).attr('id') === 'active') {
                $(`.mapRow${row}`).children(`.mapCol${trackedLocation[1]}`).attr('id', 'occupied');
            } else {
                // Error Message
                console.log(`Tile invalid. Please review map ${currentMap}`)
            }

        } else if (trackedLocation[2] === 'right') {
            // Grabs the first column on the next map
            let col = parseInt(findTileLocation($(`.mapRow${trackedLocation[0]}`).children().first().attr('class')))
            // Ensures that the tile is valid before changing it
            if ($(`.mapRow${trackedLocation[0]}`).children(`.mapCol${col}`).attr('id') === 'active') {
                $(`.mapRow${trackedLocation[0]}`).children(`.mapCol${col}`).attr('id', 'occupied');
            } else {
                // Error Message
                console.log(`Tile invalid. Please review map ${currentMap}`)
            }

        } else if (trackedLocation[2] === 'left') {
            // Grabs the first column on the next map
            let col = parseInt(findTileLocation($(`.mapRow${trackedLocation[0]}`).children().last().attr('class')))
            // Ensures that the tile is valid before changing it
            if ($(`.mapRow${trackedLocation[0]}`).children(`.mapCol${col}`).attr('id') === 'active') {
                $(`.mapRow${trackedLocation[0]}`).children(`.mapCol${col}`).attr('id', 'occupied');
            } else {
                // Error Message
                console.log(`Tile invalid. Please review map ${currentMap}`)
            }
        }
    }

    gameStarted = true;
}
