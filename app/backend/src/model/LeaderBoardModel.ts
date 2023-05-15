import MatchModel from './MatchModel';
import TeamModel from './TeamModel';
import LeaderBoardInter from '../interfaces/LeaderBoardInter';

// Fluxo 4: Leaderboards (Placares)

class LeaderBoardModel implements LeaderBoardInter {
  constructor(private teamModel: TeamModel, private matchModel: MatchModel) {}
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;

  async getLeaderBoard() {
    const finishedMatches = await this.getOverMatch();
  }

  async getOverMatch() {
    const allMatches = await this.matchModel.getMatches();

    const finishedMatches = allMatches.filter((match) => !match.inProgress);

    return finishedMatches;
  }

  async numberOfGames(teamId: number) {
    const finishedMatches = await this.getOverMatch();

    const numberOfGames = finishedMatches.filter(
      (match) => match.homeTeamId === teamId || match.awayTeamId === teamId,
    ).length;

    return numberOfGames;
  }

  async numberOfWins(teamId: number) {
    const finishedMatches = await this.getOverMatch();

    const numberOfWins = finishedMatches.filter((match) => {
      if (match.homeTeamId === teamId) {
        return match.homeTeamGoals > match.awayTeamGoals;
      }
      if (match.awayTeamId === teamId) {
        return match.awayTeamGoals > match.homeTeamGoals;
      }
      return false;
    }).length;

    return numberOfWins;
  }
}
export default LeaderBoardModel;
