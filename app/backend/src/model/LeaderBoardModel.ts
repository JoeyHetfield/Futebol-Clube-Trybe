import MatchModel from './MatchModel';
import TeamModel from './TeamModel';
import LeaderBoardInter from '../interfaces/LeaderBoardInter';
import Match from '../database/models/Match';

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

  static async numberOfGames(teamId: number, matches: Match[]) {
    const numberOfGames = matches.filter(
      (match) => match.homeTeamId === teamId || match.awayTeamId === teamId,
    ).length;
    return numberOfGames;
  }

  static async numberOfWinsHome(teamId: number, matches: Match[]) {
    const numberOfWinsHome = matches.filter(
      (match) => match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals,
    ).length;
    return numberOfWinsHome;
  }

  static async numberOfWinsAway(teamId: number, matches: Match[]) {
    const numberOfWinsAway = matches.filter(
      (match) => match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals,
    ).length;
    return numberOfWinsAway;
  }

  static async numberOfWins(teamId: number, matches: Match[]) {
    const numberOfWinsHome = await LeaderBoardModel.numberOfWinsHome(teamId, matches);
    const numberOfWinsAway = await LeaderBoardModel.numberOfWinsAway(teamId, matches);
    const numberOfWins = numberOfWinsHome + numberOfWinsAway;
    return numberOfWins;
  }

  static async numberOfDraws(teamId: number, matches: Match[]) {
    const numberOfDraws = matches.filter(
      (match) => match.homeTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals,
    ).length;
    return numberOfDraws;
  }

  static async numberOfLossesHome(teamId: number, matches: Match[]) {
    const numberOfLossesHome = matches.filter(
      (match) => match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals,
    ).length;
    return numberOfLossesHome;
  }

  static async numberOfLossesAway(teamId: number, matches: Match[]) {
    const numberOfLossesAway = matches.filter(
      (match) => match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals,
    ).length;
    return numberOfLossesAway;
  }

  static async numberOfLosses(teamId: number, matches: Match[]) {
    const numberOfLossesHome = await LeaderBoardModel.numberOfLossesHome(teamId, matches);
    const numberOfLossesAway = await LeaderBoardModel.numberOfLossesAway(teamId, matches);
    const numberOfLosses = numberOfLossesHome + numberOfLossesAway;
    return numberOfLosses;
  }
}
export default LeaderBoardModel;
