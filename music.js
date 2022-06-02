// Music Class: Represents a Song
class Song {
    constructor(title, singer, id) {
        this.title = title;
        this.singer = singer;
        this.id = id;
    }
}

// UI Class: Hands UI Tasks
class UI {
     static displaySong() {

    const songs = Store.getSongs();

    songs.forEach((song) => UI.addSongToList(song));
} 

 static addSongToList(song) {
    const list = document.querySelector("#music-list");

    const row = document.createElement('tr');

    row.innerHTML = `
    <td> ${song.title} </td>
    <td> ${song.singer} </td>
    <td> ${song.id} </td>
    <td> <a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
 }

 static deleteSong(el) {
    if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
    }
}

static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#music-form");
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

static clearFields(row) {
    document.querySelector('#title').value = "";
    document.querySelector('#singer').value = "";
    document.querySelector('#id').value = "";
}
    }

// Store Class: Handle Storages
class Store {
   static getSongs() {
        let songs;
        if(localStorage.getItem('songs') === null) {
            songs = [];
        } else {
            songs = JSON.parse(localStorage.getItem('songs'));
        }
        return songs;   
     }

    static addSong(song) {
        const songs = Store.getSongs();

        songs.push(song);

        localStorage.setItem('songs', JSON.stringify(songs));
    }

    static removeSong(id) {
         const songs = Store.getSongs();  
         songs.forEach((song, index) => {
            if(song.id === id) {
                songs.splice(index, 1);
            }
         });

         localStorage.setItem('songs', JSON.stringify(songs));
    }
}

// Events to display Songs
document.addEventListener('DOMContentLoaded', UI.displaySong);

// Event to Add a Song
document.querySelector("#music-form").addEventListener('submit', (e) => {
    //Prevent actual submit
e.preventDefault();

    // get form values
    const title = document.querySelector('#title').value;
    const singer = document.querySelector('#singer').value;
    const id = document.querySelector('#id').value;

    // Validate

    if(title === '' || singer === '' || id === '') {
      UI.showAlert('Please fill in all fields' , 'danger');
    } else {
         //Instantiate Song
        const song = new Song(title, singer, id);

    //Add Song to UI
    UI.addSongToList(song);

    // Add song to Store
    Store.addSong(song);

    // Show success message
    UI.showAlert('Song added' , 'success');

    //CLear fields
    UI.clearFields();
    }
});

// Event to Remove a Song
document.querySelector('#music-list').addEventListener('click', (e) => {

    // Remove book from UI
    UI.deleteSong(e.target);

    //Remove song from store    
    Store.removeSong(e.target.parentElement.previousElementSibling.innerHTML);

    // Book removed
    UI.showAlert('Song removed' , 'success');
});