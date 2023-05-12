import Match from '../database/models/Match';

class MatchModel {
  constructor(private match = Match) {}

  async getMatches(inProgress?: boolean) {
    const matches = await this.match.scope('matchScope').findAll();

    if (inProgress !== undefined) {
      return matches.filter((match) => match.inProgress === inProgress);
    }

    return matches;
  }
}

export default MatchModel;
