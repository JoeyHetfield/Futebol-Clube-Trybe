import MatchModel from '../model/MatchModel';
import TeamModel from '../model/TeamModel';
import ErrorFile from '../utils/ErrorFile';

class MatchService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) {}

  async getMatches(inProgress?: string) {
    const matches = await this.matchModel.getMatches(inProgress);
    return matches;
  }

  async finishMatch(id: number) {
    const match = await this.matchModel.finishMatch(id);
    return match;
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const match = await this.matchModel.updateMatch(
      id,
      homeTeamGoals,
      awayTeamGoals,
    );
    return match;
  }

  async validateTeam(homeId: number, awayId: number) {
    const homeTeam = await this.teamModel.get1Team(homeId);
    const awayTeam = await this.teamModel.get1Team(awayId);
    if (homeTeam === null || awayTeam === null) {
      throw new ErrorFile('There is no team with such id!', 404);
    }
    if (homeId === awayId) {
      throw new ErrorFile('It is not possible to create a match with two equal teams', 422);
    }
  }

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    await this.validateTeam(homeTeamId, awayTeamId);

    const match = await this.matchModel.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    return match;
  }
}

export default MatchService;
