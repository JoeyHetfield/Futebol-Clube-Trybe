import { Request, Response } from 'express';
import TeamService from '../service/TeamService';

class TeamController {
  constructor(private teamService = new TeamService()) {}

  async getTeams(req: Request, res: Response) {
    const teams = await this.teamService.getTeams();
    res.status(200).json(teams);
  }
}

export default TeamController;
