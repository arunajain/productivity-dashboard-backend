import ProjectModel from "../src/models/Project.js";

class ProjectService {
  static async createProject(data) {
    // validation / business rules
    if (!data.name) throw new Error("Name required");
    const project = await ProjectModel.create(data);
    return project;
  }
}

export default ProjectService;
