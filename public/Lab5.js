var artistList = document.getElementById("artistList");
var artistArray = new Array;

function addArtist() {

    var x = document.getElementById("list");
    if(x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function loadArtist() {

    for(let i = 0; i < artistArray.length; i++) {
        var artist = document.createElement("div");
        var artistAbout = document.createElement("div");
        var artistImg = document.createElement("img");
        var artistName = document.createElement("div");

        artist.setAttribute("class", "artist");
        artist.setAttribute("id", i);
        artistName.setAttribute("class", "artistName");
        artistAbout.setAttribute("class", "artistAbout");

        artistName.textContent = artistArray[i].name;
        artistAbout.textContent = artistArray[i].about;
        artistImg.setAttribute("src", artistArray[i].url);

        artist.appendChild(artistImg);
        artist.appendChild(artistName);
        artist.appendChild(artistAbout);
        artistList.appendChild(artist);
    }
}

function createArtist() {

    var artistList = document.getElementById("artistList");
    var artist = document.createElement("div");
    var artistDesc = document.createElement("div");
    var nameDiv = document.createElement("b");
    var aboutDiv = document.createElement("p");
    var urlDiv = document.createElement("img");
    var deleteDiv = document.createElement("div");
    var deleteBtn = document.createElement("button");
    deleteDiv.append(deleteBtn);
    deleteBtn.setAttribute("onclick", "deleteArtist()");

    var artistName = document.getElementById("list-nameInput").value;
    var artistAbout = document.getElementById("list-aboutInput").value;
    var artistUrl = document.getElementById("list-urlInput").value;

    artistDesc.setAttribute("class", "artistDesc");
    artist.setAttribute("class", "artist");
    urlDiv.setAttribute("src", artistUrl);
    deleteBtn.setAttribute("class", "deleteBtn");
    deleteDiv.setAttribute("onclick", "deleteDiv(this)");
    deleteDiv.setAttribute("class", "deleteDiv");

    nameDiv.textContent = artistName;
    aboutDiv.textContent = artistAbout;
    deleteBtn.textContent = "delete";
    
    artistDesc.append(nameDiv);
    artistDesc.append(aboutDiv);
    artist.append(urlDiv);
    artist.append(artistDesc);
    artist.append(deleteDiv);
    artistList.append(artist);

    
    var artist = {
        "name": artistName,
        "about": artistAbout,
        "url": artistUrl
    };
    console.log(JSON.stringify(artist));

    artistArray.push(artist);

    console.log(artistArray);

    fetch('/saveArtist', { 
        method: 'POST',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify(artistArray)})
        .then((response) => response.text()) 
        .then((data) => {
            console.log(data); })
            .catch((err) => console.log(err));

    fetch('/loadArtist', {
        method: 'GET'})
        .then((response) => response.text()) 
        .then((data) => {
            artistArray = data;
            console.log(artistArray);
            loadArtist(); })
            .catch((err) => console.log(err));
    
    document.getElementById('list-nameInput').value = '';
    document.getElementById('list-aboutInput').value = '';
    document.getElementById('list-urlInput').value = '';
}


function searchArtist() {

}

function deleteArtist() {

    artistArray.splice(this.parentElement.id, 1);
    this.parentElement.remove();
}