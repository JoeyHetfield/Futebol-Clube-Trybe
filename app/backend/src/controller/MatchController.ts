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
}

export default MatchController;
