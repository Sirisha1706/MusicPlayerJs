const musicData = [
    { id:1, 
      name: 'Poolamme Pilla',
      artist: 'Gowra Hari',
      image: 'images/poolamme_pilla.jpg',
      genre: 'Fock',
      source: 'audio/Poolamme_pilla.mp3'
    },
    { id:2, 
      name: 'Ammaadi',
      artist: 'kaala Bhairava',
      image: 'images/ammaadi.jpg',
      genre: 'Pop',
      source: 'audio/Ammaadi.mp3'
    },
    { id:3, 
      name: 'Inthandham',
      artist: 'SPB Charan',
      image: 'images/inthandham.jpg',
      genre: 'Pop',
      source: 'audio/Inthandham.mp3'
    },
    { id:4, 
      name: 'Ammadu Lets do kummudu',
      artist: 'Sid Sriram',
      image: 'images/ammadu.jpg',
      genre: 'Rock',
      source: 'audio/Ammadu.mp3'
    }
];

const Allplaylist = {};
var currentPlaylist = null;

const toggle = document.getElementById('togglebtn')
const allSongsDiv = document.getElementById('genreFilter');
const showSongs = document.getElementById('allSongs');
const songName = document.getElementById('songName');
const songArtist = document.getElementById('songArtist');
const songImg = document.querySelector('#songCard img');
const songAudio = document.querySelector('#songControls audio');
const presong = document.getElementById('prevSong');
const nextsong = document.getElementById('nextSong');
const addplayListbtn = document.querySelector('#addPlaylist');
const createInptL = document.getElementById('playInput');
const currentList = document.querySelector('.currentPlaylist')
const playList = document.querySelector('.allPlaylist');
const createBtn = document.getElementById('create');




musicData.forEach(music => {
    let list = [];
    document.querySelectorAll('.genreFilter option').forEach(opt =>list.push(opt.textContent));
    if(!list.includes(music.genre)){
        let element = `<option>${music.genre}</option>`;
        allSongsDiv.innerHTML += element;
    }
});


function toggleTheme(){
    let bodyTheme = document.getElementsByTagName('body')[0];
    if(bodyTheme.getAttribute('theme') === 'light')
        bodyTheme.setAttribute('theme', 'dark');
    else
        bodyTheme.setAttribute('theme','light');
}
toggle.addEventListener('click', toggleTheme);

function showSong(genre){
    showSongs.innerHTML = '';
    musicData.forEach(music =>{
        if(music.genre === genre || genre === 'allsong'){
            let ele = document.createElement('div');
            ele.textContent = music.name;
            showSongs.appendChild(ele);
            
            ele.addEventListener('click', ()=>{
                renderCurrentSongs(music);
                renderList(music);
            })
        }
    })
}

allSongsDiv.addEventListener('change', ()=>{
    showSong(allSongsDiv.value);
});
showSong(allSongsDiv.value);

function renderCurrentSongs(song){
    songName.textContent = song.name;
    songArtist.textContent = song.artist;
    songImg.src = song.image;
    songAudio.src = song.source;
};
renderCurrentSongs(musicData[0]);

function createPlaylist(){
    const txt = createInptL.value.trim();
    createInptL.value = '';
    let isCreated = false;
    document.querySelectorAll('.allPlaylist div').forEach(ele =>{
        if(ele.textContent === txt)
            isCreated = true;
    });
    if(txt.length>0){
        if(!isCreated){
            let element = document.createElement('div');
            element.textContent = txt;
            playList.appendChild(element);

            Allplaylist[txt] = [];
            console.log(Allplaylist);
            element.addEventListener('click', (e)=>{
                currentPlaylist = e.target.textContent;
                renderList();
            });
        }
        else
            alert(`"${txt}" PlayList Already Created.`);
    }
}
createBtn.addEventListener('click', createPlaylist);

function addSongsPlaylist(){
    const songname = songName.textContent;
    const songartist = songArtist.textContent;
    let created = false;
    console.log(document.querySelectorAll('.currentPlaylist div').textContent);
    document.querySelectorAll('.currentPlaylist div').forEach(ele =>{
        if(ele.textContent.split(" - ")[0].trim() === songname)
            isCreated = true;
    });

    if(!created){
        if(currentPlaylist != null){
            let cList = document.createElement('div');
            cList.textContent = `${songname} - ${songartist}`;
            currentList.appendChild(cList);

            Allplaylist[currentPlaylist].push({
                name: `${songname} - ${songartist}`,
                element: cList,
            });
        }
        else 
            alert('Forgot to Create PlayList, Please Do it.');
    }
    else
        alert(`${songname} already in playlist`);
}
addplayListbtn.addEventListener('click', addSongsPlaylist);

function renderList(){
    currentList.innerHTML = '';
    Allplaylist[currentPlaylist].forEach(song =>{
        let ele = song.element;
        currentList.appendChild(ele);
    });
}

function controlHandlers(Csong, type){
    const details = {
        currentIndex: -1,
        nextIndex: -1,
        nextSname : null,
        continue: true
    };
    document.querySelectorAll('#allSongs div').forEach((ele, index) =>{
        if(type == 'nextsong'){
            if(ele.textContent == Csong)
                details.currentIndex = index + 1;
            if(details.currentIndex == index){
                details.nextIndex = index + 1
                details.nextSname = ele.textContent;
            }
        }
        else{
            if(ele.textContent == Csong){
                details.currentIndex = index;
                details.continue = false;
            }
            if(details.continue){
                details.nextIndex = index;
                details.nextSname = ele.textContent;
            }
        }
    });
    if(details.nextIndex != -1){
        let music = musicData.find((song) => song.name == details.nextSname);
        renderCurrentSongs(music);
    }
}

nextsong.addEventListener('click', ()=>{
    controlHandlers(songName.textContent, 'nextsong');
});

presong.addEventListener('click', ()=>{
    controlHandlers(songName.textContent, 'prevsong');
});