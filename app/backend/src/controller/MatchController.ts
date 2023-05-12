import { Request, Response } from 'express';
import MatchService from '../service/MatchService';

class MatchController {
  constructor(private matchService = new MatchService()) {}

  async getMatches(req: Request, res: Response) {
    const matches = await this.matchService.getMatches();
    res.status(200).json(matches);
  }
}

export default MatchController;
