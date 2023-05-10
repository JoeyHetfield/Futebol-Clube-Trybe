import Team from '../database/models/Team';

class TeamModel {
  constructor(private team = Team) {}

  async getTeams() {
    const teams = await this.team.findAll();
    return teams;
  }

  async get1Team(id: number) {
    const team = await this.team.findByPk(id);
    return team;
  }
}

export default TeamModel;
