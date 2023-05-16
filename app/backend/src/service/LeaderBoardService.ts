import MatchModel from '../model/MatchModel';
import TeamModel from '../model/TeamModel';
import LeaderBoardInter from '../interfaces/LeaderBoardInter';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

class LeaderBoardService {
  constructor(private teamModel = new TeamModel(), private matchModel = new MatchModel()) {}
  async getLeaderBoard(teamParam: 'home' | 'away' | 'all'): Promise<LeaderBoardInter[]> {
    const teams = await this.teamModel.getTeams();
    const matches = await this.matchModel.getFinishedMatches();

    const leaderBoard = teams.map((team) => LeaderBoardService
      .creatingBoard(team, matches, teamParam));
    const createdBoard = await Promise.all(leaderBoard);
    return LeaderBoardService.sortLeaderBoard(createdBoard);
  }

  static async creatingBoard(team: Team, matches: Match[], teamParam: 'home' | 'away' | 'all') {
    const totalVictories = await LeaderBoardService.numberOfWins(team.id, matches, teamParam);
    const totalDraws = await LeaderBoardService.numberOfDraws(team.id, matches, teamParam);
    const goalsFavor = await LeaderBoardService.goalsFavor(team.id, matches, teamParam);
    const goalsOwn = await LeaderBoardService.goalsOwn(team.id, matches, teamParam);
    const totalPoints = totalVictories * 3 + totalDraws;
    const totalGames = await LeaderBoardService.numberOfGames(team.id, matches, teamParam);
    return {
      name: team.teamName,
      totalLosses: await LeaderBoardService.numberOfLosses(team.id, matches, teamParam),
      totalVictories,
      totalDraws,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
      totalPoints,
      totalGames,
      goalsFavor,
      goalsOwn,
    };
  }

  static async numberOfGames(teamId: number, matches: Match[], team: 'home' | 'away' | 'all') {
    if (team === 'home') {
      const numberOfGames = matches.filter(
        (match) => match.homeTeamId === teamId,
      ).length;
      return numberOfGames;
    }

    if (team === 'away') {
      const numberOfGames = matches.filter(
        (match) => match.awayTeamId === teamId,
      ).length;
      return numberOfGames;
    }

    return matches.filter(
      (match) => match.homeTeamId === teamId || match.awayTeamId === teamId,
    ).length;
  }

  static async numberOfWins(teamId: number, matches: Match[], team: 'home' | 'away' | 'all') {
    if (team === 'home') {
      const numberOfWinsHome = matches.filter(
        (match) => match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals,
      ).length;
      return numberOfWinsHome;
    }

    if (team === 'away') {
      const numberOfWinsAway = matches.filter(
        (match) => match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals,
      ).length;
      return numberOfWinsAway;
    }

    const numberOfWins = matches.filter(
      (match) => (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals)
       || (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals),
    ).length;
    return numberOfWins;
  }

  static async numberOfDraws(teamId: number, matches: Match[], team: 'home' | 'away' | 'all') {
    if (team === 'home') {
      const numberOfDraws = matches.filter(
        (match) => match.homeTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals,
      ).length;
      return numberOfDraws;
    }

    if (team === 'away') {
      const numberOfDraws = matches.filter(
        (match) => match.awayTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals,
      ).length;
      return numberOfDraws;
    }

    const numberOfDraws = matches.filter(
      (match) => (match.homeTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals)
        || (match.awayTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals),
    ).length;
    return numberOfDraws;
  }

  static async numberOfLosses(teamId: number, matches: Match[], team: 'home' | 'away' | 'all') {
    if (team === 'home') {
      const numberOfLossesHome = matches.filter(
        (match) => match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals,
      ).length;
      return numberOfLossesHome;
    }

    if (team === 'away') {
      const numberOfLossesAway = matches.filter(
        (match) => match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals,
      ).length;
      return numberOfLossesAway;
    }

    const numberOfLosses = matches.filter(
      (match) => (match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals)
        || (match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals),
    ).length;
    return numberOfLosses;
  }

  static async goalsFavor(teamId: number, matches: Match[], team: 'home' | 'away' | 'all') {
    if (team === 'home') {
      const goalsFavorHome = matches.filter((match) => match.homeTeamId === teamId)
        .reduce((acc, match) => acc + match.homeTeamGoals, 0);
      return goalsFavorHome;
    }
    if (team === 'away') {
      const goalsFavorAway = matches.filter((match) => match.awayTeamId === teamId)
        .reduce((acc, match) => acc + match.awayTeamGoals, 0);
      return goalsFavorAway;
    }

    const goalsFavor = matches
      .filter((match) => match.homeTeamId === teamId || match.awayTeamId === teamId)
      .reduce((acc, match) => {
        if (match.homeTeamId === teamId) return acc + match.homeTeamGoals;
        return acc + match.awayTeamGoals;
      }, 0);

    return goalsFavor;
  }

  static async goalsOwn(teamId: number, matches: Match[], team: 'home' | 'away' | 'all') {
    if (team === 'home') {
      const goalsOwn = matches.filter((match) => match.homeTeamId === teamId)
        .reduce((acc, match) => acc + match.awayTeamGoals, 0);
      return goalsOwn;
    }

    if (team === 'away') {
      const goalsOwn = matches.filter((match) => match.awayTeamId === teamId)
        .reduce((acc, match) => acc + match.homeTeamGoals, 0);
      return goalsOwn;
    }

    const goalsOwn = matches
      .filter((match) => match.homeTeamId === teamId || match.awayTeamId === teamId)
      .reduce((acc, match) => {
        if (match.awayTeamId === teamId) return acc + match.homeTeamGoals;
        return acc + match.awayTeamGoals;
      }, 0);
    return goalsOwn;
  }

  static async sortLeaderBoard(leaderBoard: LeaderBoardInter[]) {
    const leaderBoardSorted = leaderBoard.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }

      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }

      return b.goalsFavor - a.goalsFavor;
    });
    return leaderBoardSorted;
  }
}
export default LeaderBoardService;
