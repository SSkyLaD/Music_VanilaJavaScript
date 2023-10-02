const musicData =[{
    name:"All My Love",
    artist:"Cash Cash ft. Conor Maynard",
    directory:'./material/Cash Cash - All My Love (feat. Conor Maynard).flac',
    coverimage :'./material/albumImage/overtime.jpg'
},
{
    name:"Beliver",
    artist:"Don Diablo",
    directory:"./material/Don Diablo - Believe.flac",
    coverimage :'./material/albumImage/believe.jpg'
},
{
    name:"Stressed Out",
    artist:"Twenty One Pilots",
    directory:"./material/Twenty One Pilots - Stressed Out.flac",
    coverimage :'./material/albumImage/stressedout.jpg'
},
{
    name:"Bad Memories",
    artist:"Meduza",
    directory:"./material/Meduza - Bad Memories.flac",
    coverimage :'./material/albumImage/badmemories.jpg'
},
{
    name:"Cold Water",
    artist:"Major Lazer (feat. Justin Bieber & MØ)",
    directory:"./material/Major Lazer - Cold Water (feat. Justin Bieber & MØ).flac",
    coverimage :'./material/albumImage/coldwater.jpg' 
},
{
    name:"All My Love",
    artist:"Cash Cash ft. Conor Maynard",
    directory:'./material/Cash Cash - All My Love (feat. Conor Maynard).flac',
    coverimage :'./material/albumImage/overtime.jpg'
},
{
    name:"Beliver",
    artist:"Don Diablo",
    directory:"./material/Don Diablo - Believe.flac",
    coverimage :'./material/albumImage/believe.jpg'
},
{
    name:"Stressed Out",
    artist:"Twenty One Pilots",
    directory:"./material/Twenty One Pilots - Stressed Out.flac",
    coverimage :'./material/albumImage/stressedout.jpg'
},
{
    name:"Bad Memories",
    artist:"Meduza",
    directory:"./material/Meduza - Bad Memories.flac",
    coverimage :'./material/albumImage/badmemories.jpg'
},
{
    name:"Cold Water",
    artist:"Major Lazer (feat. Justin Bieber & MØ)",
    directory:"./material/Major Lazer - Cold Water (feat. Justin Bieber & MØ).flac",
    coverimage :'./material/albumImage/coldwater.jpg' 
},
{
    name:"All My Love",
    artist:"Cash Cash ft. Conor Maynard",
    directory:'./material/Cash Cash - All My Love (feat. Conor Maynard).flac',
    coverimage :'./material/albumImage/overtime.jpg'
},
{
    name:"Beliver",
    artist:"Don Diablo",
    directory:"./material/Don Diablo - Believe.flac",
    coverimage :'./material/albumImage/believe.jpg'
},
{
    name:"Stressed Out",
    artist:"Twenty One Pilots",
    directory:"./material/Twenty One Pilots - Stressed Out.flac",
    coverimage :'./material/albumImage/stressedout.jpg'
},
{
    name:"Bad Memories",
    artist:"Meduza",
    directory:"./material/Meduza - Bad Memories.flac",
    coverimage :'./material/albumImage/badmemories.jpg'
},
{
    name:"Cold Water",
    artist:"Major Lazer (feat. Justin Bieber & MØ)",
    directory:"./material/Major Lazer - Cold Water (feat. Justin Bieber & MØ).flac",
    coverimage :'./material/albumImage/coldwater.jpg' 
}];

const progress =document.querySelector('#progress');
const song =document.querySelector('#song');
const play =document.querySelector('.play');
const nowTime =document.querySelector('.nowtime');
const fulltime =document.querySelector('.fulltime');
const backward = document.querySelector('.backward');
const forward = document.querySelector('.forward');
const audioSetting = document.querySelector('.volume');
const search = document.getElementById('search-input');
const audioVolume = document.getElementById('volume-change');
const loopButton = document.querySelector('.loop');

const defaultVolume = 0.5;
let songIndex = 0;
let loop = false;
loadPlaylist();
loadSong(musicData[songIndex]);
audioVolume.value = defaultVolume*100;
song.volume = defaultVolume;



function loadPlaylist(){
    let generateHTML ='';
    musicData.forEach((value,index)=>{
        generateHTML += `
        <div class="song-element" onclick="loadSong(musicData[${index}])">
            <img src="${value.coverimage}" alt="">
            <div class="text-content">
                <p class="song-name">${value.name}</p>
                <p class="artis">${value.artist}</p>
            </div>
        </div>`
    })
    document.querySelector('.music-list').innerHTML=generateHTML;
}

function loadSong(musicDataIndex){
    document.querySelector('.song-name').textContent = musicDataIndex.name;
    document.querySelector('.artis').textContent = musicDataIndex.artist;
    document.querySelector('.music-img').src = musicDataIndex.coverimage;
    song.src = musicDataIndex.directory;
    songIndex = musicData.indexOf(musicDataIndex);
    nowPlayingOnPlaylist();
}

search.addEventListener('keyup',()=>{
    const searchInput = search.value;
    const reg = new RegExp(`\\b${searchInput}`, 'gi');
    const searchResult=[];
    for(let i =0; i<musicData.length;i++){
        if(reg.test(musicData[i].name)){
            searchResult.push(i);
        }
    }
    if(!searchResult){
        loadPlaylist();
    }else{
        let generateHTML ='';
        searchResult.forEach((value)=>{
            generateHTML += `
            <div class="song-element" onclick="loadSong(musicData[${value}])">
                <img src="${musicData[value].coverimage}" alt="">
                <div class="text-content">
                    <p class="song-name">${musicData[value].name}</p>
                    <p class="artis">${musicData[value].artist}</p>
                </div>
            </div>`
        })
        document.querySelector('.music-list').innerHTML=generateHTML;
        nowPlayingOnPlaylist();
    }
})

function timeConvert(number){
    const minute = Math.floor(number/60);
    const second = Math.floor(number % 60);
    const formatedMinute = minute < 10 ? `0${minute}` : `${minute}`;
    const formatedSecond = second < 10 ? `0${second}` : `${second}`;
    return `${formatedMinute}:${formatedSecond}`;
}

let isPlay = false;
backward.addEventListener('click',()=>{
    if(songIndex===0){
        songIndex = musicData.length - 1;
    }
    else songIndex--;
    loadSong(musicData[songIndex]);
    isPlay= true;
    song.play();
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
});

forward.addEventListener('click',()=>{
    if(songIndex===musicData.length - 1){
        songIndex = 0;
    }
    else songIndex++;
    loadSong(musicData[songIndex]);
    isPlay= true;
    song.play();
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
});

audioSetting.addEventListener('click',()=>{
    if(song.muted === false){
        song.muted = true;
        audioSetting.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }else{
        song.muted = false;
        audioSetting.innerHTML ='<i class="fa-solid fa-volume-high"></i>'
    }
})

play.addEventListener('click',(isplay)=>{
    if(!isPlay){
        isPlay= true;
        song.play();
        play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    else {
        isPlay= false;
        song.pause();
        play.innerHTML ='<i class="fa-solid fa-play">';
    }
});
song.addEventListener('loadedmetadata',()=>{
    // Thiết lập giá trị max của thanh progress bằng độ dài của bài hát (tính bằng giây)
    progress.max = song.duration;
    fulltime.textContent = timeConvert(progress.max);
});

progress.addEventListener('input',()=>{
    // Thiết lâp giá trị thời gian hiện tại của bài hát bằng với giá trị của thanh progress
    song.currentTime = parseFloat(progress.value);
});

song.addEventListener('timeupdate',()=>{
    //update giá trị của thanh progress bằng với giá trị hiện tại của thời gian bài hát
    progress.value = song.currentTime;
    nowTime.innerHTML =timeConvert(progress.value);
    if(song.currentTime===song.duration && loop === false ){
        if(songIndex===musicData.length - 1){
            songIndex = 0;
        }
        else songIndex++;
        loadSong(musicData[songIndex]);
        isPlay= true;
        song.play();
        play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
});

audioVolume.addEventListener('input',()=>{
    // giá trị của volume chạy từ 0-1 , mặc định của input range là tù 0-100
    song.volume = (audioVolume.value)/100;
})


loopButton.addEventListener('click',()=>{
    if(!loop){
        song.loop = true;
        loop = true;
        loopButton.style.opacity = '0.7';
    }
    else {
        song.loop = false;
        loop = false;
        loopButton.style.opacity = '';
    }

})

//Hàm này hơi ngu 
function nowPlayingOnPlaylist() {
    const selectA = document.querySelectorAll('.song-element');
    const selectB = document.querySelector('.music-space');
    const currentSongName = selectB.querySelector('.song-name').textContent;
  
    for (let i = 0; i < selectA.length; i++) {
      const songNameElement = selectA[i].querySelector('.song-name');
      if (songNameElement.textContent === currentSongName) {
        selectA[i].style.padding = '10px';
        selectA[i].style.border = '3px solid rgb(255, 255, 255)';
        selectA[i].style.borderRadius = '10px';
        selectA[i].style.boxShadow = '0 5px 5px rgba(255 ,26,26 ,0.22)';
        selectA[i].style.transition ='all .3s ease';
      }
      else{
        selectA[i].style.padding = '';
        selectA[i].style.border = '';
        selectA[i].style.borderRadius = '';
        selectA[i].style.boxShadow = '';
        selectA[i].style.transition ='';
      }
    }
};
