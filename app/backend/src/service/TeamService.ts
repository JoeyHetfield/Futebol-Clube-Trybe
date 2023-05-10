import TeamModel from '../model/TeamModel';

class TeamService {
  constructor(private teamModel = new TeamModel()) {}

  async getTeams() {
    const teams = await this.teamModel.getTeams();
    return teams;
  }
}

export default TeamService;
