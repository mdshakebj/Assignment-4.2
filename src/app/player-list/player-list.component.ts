import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];
  selectedPlayer: Player | null = null;
  defaultPlayer: Player = {
    id: 0,
    name: '',
    age: 0,
    team: ''
  };

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers() {
    this.playerService.getPlayers().subscribe(
      (response: Player[]) => {
        this.players = response;
      },
      (error: any) => {
        console.error('Error fetching players:', error);
      }
    );
  }

  addPlayer(player: Player) {
    this.playerService.addPlayer(player).subscribe(
      (response: Player) => {
        this.players.push(response);
      },
      (error: any) => {
        console.error('Error adding player:', error);
      }
    );
  }

  updatePlayer(updatedPlayer: Player) {
    this.playerService.updatePlayer(updatedPlayer).subscribe(
      () => {
        const index = this.players.findIndex(player => player.id === updatedPlayer.id);
        if (index !== -1) {
          this.players[index] = updatedPlayer;
        }
        this.selectedPlayer = null;
      },
      (error: any) => {
        console.error('Error updating player:', error);
      }
    );
  }

  deletePlayer(playerId: number) {
    this.playerService.deletePlayer(playerId).subscribe(
      () => {
        const index = this.players.findIndex(player => player.id === playerId);
        if (index !== -1) {
          this.players.splice(index, 1);
        }
      },
      (error: any) => {
        console.error('Error deleting player:', error);
      }
    );
  }

  editPlayer(player: Player) {
    this.selectedPlayer = { ...player };
  }
}
