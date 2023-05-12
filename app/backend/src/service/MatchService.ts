import MatchModel from '../model/MatchModel';

class MatchService {
  constructor(private matchModel = new MatchModel()) {}

  async getMatches() {
    const matches = await this.matchModel.getMatches();
    return matches;
  }
}

export default MatchService;
