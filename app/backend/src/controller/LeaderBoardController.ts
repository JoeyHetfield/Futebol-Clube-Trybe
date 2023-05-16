import { Request, Response } from 'express';
import LeaderBoardService from '../service/LeaderBoardService';

class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  async getLeaderBoard(req: Request, res: Response) {
    const leaderBoard = await this.leaderBoardService.getLeaderBoard('all');
    res.status(200).json(leaderBoard);
  }

  async getLeaderBoardHome(req: Request, res: Response) {
    const leaderBoard = await this.leaderBoardService.getLeaderBoard('home');
    res.status(200).json(leaderBoard);
  }

  async getLeaderBoardAway(req: Request, res: Response) {
    const leaderBoard = await this.leaderBoardService.getLeaderBoard('away');
    res.status(200).json(leaderBoard);
  }
}

export default LeaderBoardController;
