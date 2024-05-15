import { Repository } from "../model/Repository";
import { Member } from "../model/Member";
import { Branch, mapApiObjectToBranch } from "../model/Branch";
import { Commit, mapApiObjectToCommit } from "../model/Commit";
import { Issue } from "../model/Issue";
import { ApiResponse } from "../model/generic_repository/ApiReponse";
import { BaseResources } from "../model/generic_repository/BaseResources";
import { Label } from "../model/Label"; 
import { Milestone } from "../model/Milestone";

// Données en dur pour Member
const dummyRepositories: Repository[] = [];
const dummyMember = new Member("1", "John Doe", "http://example.com/john.jpg", dummyRepositories);

// Données en dur pour Repository
const dummyRepository1 = new Repository(
  "1",
  "Repo 1",
  dummyMember,
  false,
  "Description of Repo 1",
  false,
  "http://example.com/repo1",
  [],
  [],
  [],
  [],
  "JavaScript",
  12345
);

const dummyRepository2 = new Repository(
  "2",
  "Repo 2",
  dummyMember,
  true,
  "Description of Repo 2",
  true,
  "http://example.com/repo2",
  [],
  [],
  [],
  [],
  "TypeScript",
  67890
);

// Données en dur pour Branch, Commit, et Issue
const dummyBranches: Branch[] = [
  new Branch("1", "master", []),
  new Branch("2", "develop", []),
  // Ajoutez d'autres branches simulées si nécessaire
];

const dummyCommits: Commit[] = [
  new Commit("1", "Initial commit", new Date(), dummyMember, dummyRepository1),
  new Commit("2", "Fix issue #123", new Date(), dummyMember, dummyRepository1),
  // Ajoutez d'autres commits simulés si nécessaire
];

const dummyLabels = [new Label("1", "bug")];
const dummyMilestone = new Milestone("1", "Milestone 1");

const dummyIssues: Issue[] = [
  new Issue("1", "Issue 1", "This is issue 1", "open", new Date(), dummyMember, dummyMilestone, dummyRepository1, dummyLabels),
  new Issue("2", "Issue 2", "This is issue 2", "closed", new Date(), dummyMember, dummyMilestone, dummyRepository1, dummyLabels),
  // Ajoutez d'autres issues simulées si nécessaire
];

const dummyContributors = [dummyMember];

dummyRepository1.branches = dummyBranches;
dummyRepository1.commits = dummyCommits;
dummyRepository1.issues = dummyIssues;

dummyRepository2.branches = dummyBranches;
dummyRepository2.commits = dummyCommits;
dummyRepository2.issues = dummyIssues;

// Ajouter les repositories au member
dummyMember.repositories.push(dummyRepository1, dummyRepository2);

const dummyRepositoriesList: Repository[] = [dummyRepository1, dummyRepository2];





export class RepositoryStub  extends BaseResources<Repository>{

  // Simule la méthode getMany
  async getMany(params?: any){
    // Vous pouvez ajouter de la logique pour filtrer ou modifier les données ici en fonction des params
    return { data: dummyRepositoriesList, succeeded: true, errors: [] as any };
  }

  // Simule la méthode get
  async get(id: string){
    const repository = dummyRepositoriesList.find(repo => repo.id === id);
    if (repository) {
      return { data: repository, succeeded: true, errors: [] as any };
    } else {
      return { succeeded: false, errors: ["Repository not found"] as any };
    }
  }
  
  // Simule la méthode create
  async create(id: string, data: Repository){
    dummyRepositoriesList.push(data);
    return { data, succeeded: true, errors: [] as any };
  }

  // Simule la méthode update
  async update(id: string, data: Repository){
    const index = dummyRepositoriesList.findIndex(repo => repo.id === id);
    if (index !== -1) {
      dummyRepositoriesList[index] = data;
      return { data, succeeded: true, errors: [] as any };
    }
    return { succeeded: false, errors: ["Repository not found"] as any };
  }

  // Simule la méthode delete
  async delete(id: string){
    const index = dummyRepositoriesList.findIndex(repo => repo.id === id);
    if (index !== -1) {
      dummyRepositoriesList.splice(index, 1);
      return { succeeded: true, errors: [] as any };
    }
    return { succeeded: false, errors: ["Repository not found"] as any };
  }
}
