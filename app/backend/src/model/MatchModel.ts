import Match from '../database/models/Match';

class MatchModel {
  constructor(private match = Match) {}

  async getMatches(inProgress?: string) {
    if (inProgress === undefined) {
      const matches = await this.match.scope('matchScope').findAll();
      return matches;
    }
    const matches = await this.match.scope('matchScope').findAll({
      where: { inProgress: inProgress === 'true' },
    });
    return matches;
  }
}

export default MatchModel;
