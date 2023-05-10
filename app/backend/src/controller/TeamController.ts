import { Request, Response } from 'express';
import TeamService from '../service/TeamService';

class TeamController {
  constructor(private teamService = new TeamService()) {}

  async getTeams(req: Request, res: Response) {
    const teams = await this.teamService.getTeams();
    res.status(200).json(teams);
  }

  async get1Team(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamService.get1Team(Number(id));
    res.status(200).json(team);
  }
}

export default TeamController;
