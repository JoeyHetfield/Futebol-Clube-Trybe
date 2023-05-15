import Match from '../database/models/Match';
import ErrorFile from '../utils/ErrorFile';

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
    const match = await this.match.update({ inProgress: false }, { where: { id } });
    return match;
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const match = await this.match.findByPk(id);
    if (!match) {
      throw new ErrorFile('Match not found', 404);
    }
    if (!match.inProgress) {
      throw new ErrorFile('Match is already over', 400);
    }
    await match.update({ homeTeamGoals, awayTeamGoals });

    return match;
  }

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const match = await this.match.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return match;
  }
}

export default MatchModel;
