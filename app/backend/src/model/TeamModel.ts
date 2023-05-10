import Team from '../database/models/Team';

class TeamModel {
  constructor(private team = Team) {}

  async getTeams() {
    const teams = await this.team.findAll();
    return teams;
  }
}

export default TeamModel;
