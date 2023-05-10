import TeamModel from '../model/TeamModel';

class TeamService {
  constructor(private teamModel = new TeamModel()) {}

  async getTeams() {
    const teams = await this.teamModel.getTeams();
    return teams;
  }

  async get1Team(id: number) {
    const team = await this.teamModel.get1Team(id);
    return team;
  }
}

export default TeamService;
