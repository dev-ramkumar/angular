import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'player';

  keywords = ""
  songs = new Array()

  song= {
    image: "",
    title: "",
    singer: "",
    music: "",
    movie: "",
    lyrics: ""
  }
  index= 0
  isPlaying = false

  audio = new Audio();

  playAudio(song: any, index: any) {
    this.index = index
    this.song = song
    this.audio.src = song.path;
    this.audio.load();
    this.play()
  }

  play(){
    this.audio.play();
    this.isPlaying = true
  }

  pauseAudio () {
    this.audio.pause()
    this.isPlaying = false
  }

  previous() {
    if(this.index == 0) {
      this.playAudio(this.songs[this.songs.length - 1], this.songs.length - 1)
    } else {
      this.playAudio(this.songs[this.index - 1], this.index - 1)
    }
  }
  next() {
    if(this.index == (this.songs.length - 1)) {
      this.playAudio(this.songs[0], 0)
    } else {
      this.playAudio(this.songs[this.index + 1], this.index + 1)
    }
  }

  toggle() {
    if(this.isPlaying) {
      this.pauseAudio()
    } else {
      this.play()
    }
  }

  search(e: any) {

    fetch('https://ramkumarg1605.000webhostapp.com/telliant/search.php?search=' + e)
      .then(response => response.json())
      .then(data => {
        
        this.songs = data
      });

  }

  playSong(index: any) {
    this.playAudio(this.songs[index], index)
  }
}
