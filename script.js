var selectedPiece = "";

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    undoAllHighlights();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //console.log(data, ev.target);

    var piece = document.getElementById(data);
    piece.setAttribute("moved", "t");
    ev.target.appendChild(piece);
}

function showTips(ev) {
    const currentId = ev.target.attributes.getNamedItem("id").value;

    if (selectedPiece === currentId) {
        undoAllHighlights();
        return;
    }
    undoAllHighlights();
    selectedPiece = currentId;

    const alreadyMoved = ev.target.attributes.getNamedItem("moved").value;
    var spotCoordinates = ev.target.parentNode.attributes.getNamedItem("coordinate").value.split(",");

    if (selectedPiece.includes("blackPawn")) {
        highlightBlackPawnChoices(selectedPiece, spotCoordinates, alreadyMoved);
    }
}

function highlightBlackPawnChoices(pieceHtmlId, spotCoordinates, alreadyMoved) {

    if (pieceHtmlId.includes("blackPawn")) {
        if (alreadyMoved === "f") {
            var value1 = '[coordinate="' + (parseInt(spotCoordinates[0]) + 1) + ',' + spotCoordinates[1] + '"]';
            var value2 = '[coordinate="' + (parseInt(spotCoordinates[0]) + 2) + ',' + spotCoordinates[1] + '"]';
            var spotOne = document.querySelectorAll(value1);
            var spotTwo = document.querySelectorAll(value2);
            spotOne[0].classList.add("highlight");
            spotTwo[0].classList.add("highlight");
        } else {
            var value1 = '[coordinate="' + (parseInt(spotCoordinates[0]) + 1) + ',' + spotCoordinates[1] + '"]';
            var spotOne = document.querySelectorAll(value1);
            spotOne[0].classList.add("highlight");
        }
    }

}

function undoAllHighlights() {
    while (document.getElementsByClassName("highlight").length > 0) {
        document.getElementsByClassName("highlight")[0].classList.remove("highlight");
    }
    selectedPiece = "";
}