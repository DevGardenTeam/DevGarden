import { Issue } from "../model/Issue";
import { Member } from "../model/Member";
import { Milestone } from "../model/Milestone";
import { Repository } from "../model/Repository";
import { Label } from "../model/Label";
import { Branch } from "../model/Branch";
import { Commit } from "../model/Commit";

// Données en dur pour Member
const dummyRepositories: Repository[] = [];
const dummyMember = new Member("1", "John Doe", "http://example.com/john.jpg", dummyRepositories);

// Données en dur pour Repository
const dummyBranches: Branch[] = []; // Ajoutez des branches simulées si nécessaire
const dummyCommits: Commit[]  = []; // Ajoutez des commits simulés si nécessaire
const dummyIssues: Issue[]  = []; // Cette liste sera remplie par les instances de `Issue`
const dummyContributors = [dummyMember];

const dummyRepository = new Repository(
  "1",
  "Repo 1",
  dummyMember,
  false,
  "Description of Repo 1",
  false,
  "http://example.com/repo1",
  dummyBranches,
  dummyCommits,
  dummyContributors,
  dummyIssues,
  "JavaScript",
  12345
);

// Ajouter le repository au member
dummyMember.repositories.push(dummyRepository);

// Données en dur pour les labels et milestones
const dummyLabels = [new Label("1", "bug")];
const dummyMilestone = new Milestone("1", "Milestone 1");

// Données en dur pour les issues
const dummyIssue1 = new Issue("1", "Issue 1", "This is issue 1", "open", new Date(), dummyMember, dummyMilestone, dummyRepository, dummyLabels);
const dummyIssue2 = new Issue("2", "Issue 2", "This is issue 2", "closed", new Date(), dummyMember, dummyMilestone, dummyRepository, dummyLabels);

dummyIssues.push(dummyIssue1, dummyIssue2);

export class IssueStub {
  
  // Simule la méthode getMany
  async getMany(params?: any) {
    // Vous pouvez ajouter de la logique pour filtrer ou modifier les données ici en fonction des params
    return { data: dummyIssues, succeeded: true, errors: [] };
  }

  // Simule la méthode get
  get(id: string) {
    const issue = dummyIssues.find(issue => issue.id === id);
    return { data: issue, succeeded: !!issue, errors: issue ? [] : ["Issue not found"] };
  }

  // Simule la méthode create
  create(id: string, data: Issue) {
    dummyIssues.push(data);
    return { data, succeeded: true, errors: [] };
  }

  // Simule la méthode update
  update(id: string, data: Issue) {
    const index = dummyIssues.findIndex(issue => issue.id === id);
    if (index !== -1) {
      dummyIssues[index] = data;
      return { data, succeeded: true, errors: [] };
    } else {
      return { data: null, succeeded: false, errors: ["Issue not found"] };
    }
  }

  // Simule la méthode delete
  delete(id: string) {
    const index = dummyIssues.findIndex(issue => issue.id === id);
    if (index !== -1) {
      dummyIssues.splice(index, 1);
      return { data: null, succeeded: true, errors: [] };
    } else {
      return { data: null, succeeded: false, errors: ["Issue not found"] };
    }
  }
}