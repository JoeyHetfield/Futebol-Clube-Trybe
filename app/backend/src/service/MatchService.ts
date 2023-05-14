import MatchModel from '../model/MatchModel';
import TeamModel from '../model/TeamModel';

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

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
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
