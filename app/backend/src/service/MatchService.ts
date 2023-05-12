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
}

export default MatchService;
