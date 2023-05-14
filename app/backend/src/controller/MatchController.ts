import { Request, Response } from 'express';
import MatchService from '../service/MatchService';

class MatchController {
  constructor(private matchService = new MatchService()) {}

  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await this.matchService
      .getMatches(inProgress as string | undefined);
    res.status(200).json(matches);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchService.finishMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchService.updateMatch(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(200).json({ message: 'Updated' });
  }

  async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const match = await this.matchService.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );

    const createdMatch = {
      homeTeamId: match.homeTeamId,
      awayTeamId: match.awayTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    };

    res.status(201).json(createdMatch);
  }
}

export default MatchController;
