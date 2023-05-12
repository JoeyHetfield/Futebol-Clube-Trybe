import Match from '../database/models/Match';

class MatchModel {
  constructor(private match = Match) {}

  async getMatches() {
    const matches = await this.match.findAll();
    return matches;
  }
}

export default MatchModel;
