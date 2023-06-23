import { Component } from '@angular/core';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent {
  players: Player[] = [];
  selectedPlayer: Player = {
    id: 0,
    name: '',
    age: 0,
    team: ''
  };

  addPlayer(player: Player) {
    this.players.push(player);
  }

  updatePlayer(updatedPlayer: Player) {
    const index = this.players.findIndex(player => player.id === updatedPlayer.id);
    if (index !== -1) {
      this.players[index] = updatedPlayer;
    }
    this.selectedPlayer = {
      id: 0,
      name: '',
      age: 0,
      team: ''
    };
  }

  deletePlayer(playerId: number) {
    const index = this.players.findIndex(player => player.id === playerId);
    if (index !== -1) {
      this.players.splice(index, 1);
    }
  }

  editPlayer(player: Player) {
    this.selectedPlayer = { ...player };
  }
}