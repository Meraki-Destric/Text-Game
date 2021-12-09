const areaName = $(".title")
const textArea = $(".textArea")

function assignText() {
    let occupiedTile = $("#occupied")
    // Find current row
    let occupiedRow = findTileLocation(occupiedTile.parent().attr('class'))
    // Find current column
    let occupiedColumn = findTileLocation(occupiedTile.attr('class'))

    console.log(`Occupied Row is ${occupiedRow}`)
    console.log(`Occupied Col is ${occupiedColumn}`)

    for (let i = 0; i < currentMap.length; i++) {
        console.log("cycling");
        if (currentMap[i].row === parseInt(occupiedRow) && currentMap[i].col === parseInt(occupiedColumn)) {
            areaName.text(currentMap[i].name);
            textArea.text(currentMap[i].description);
        }
    }
}