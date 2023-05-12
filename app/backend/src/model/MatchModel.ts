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

  async finishMatch(id: number) {
    const match = await this.match.findByPk(id);
    if (match) {
      match.inProgress = false;
    }
    return match;
  }
}

export default MatchModel;
