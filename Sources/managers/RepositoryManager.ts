import { Repository } from "../model/Repository";
import { BranchService } from "../service/BranchService";
import { CommitService } from "../service/CommitService";
import { IssueService } from "../service/IssueService";
import { RepositoryService } from "../service/RepositoryService";

class RepositoryManager {
    private static instance: RepositoryManager | null = null;
    
    // La liste des repositories
    repositories: Repository[];

    // La liste des platforms
    private platforms: string[];

    // La liste des services utilisés pour récupérer les données
    private repositoryService : RepositoryService;
    private commitService : CommitService;
    private issueService : IssueService;
    private branchService : BranchService;

    // Constructor privé pour empêcher la création d'instances directes
    private constructor() {
        if (RepositoryManager.instance) {
            throw new Error("You can only create one instance of RepositoryManager !");
        }        this.repositories = [];

        RepositoryManager.instance = this;

        // Initialisation des propriétés
        this.platforms = ["github", "gitea", "gitlab"], 

        // Initialisation des services
        this.repositoryService = new RepositoryService();
        this.commitService = new CommitService();
        this.issueService = new IssueService();
        this.branchService = new BranchService();
    }

    // Méthode statique pour obtenir l'instance unique
    static getInstance(): RepositoryManager {
        if (!RepositoryManager.instance) {
            RepositoryManager.instance = new RepositoryManager();
        }
        return RepositoryManager.instance;
    }

    // Méthode pour obtenir tous les repositories
    async getRepositories() {
        const allRepositories: Repository[] = [];
    
        for (const platform of this.platforms) {
            try {
                const result = await this.repositoryService.getMany({ platform });
                if (result.succeeded) {
                    const platformRepositories = result.data;
    
                    const repositoryPromises = platformRepositories.map(async (repository) => {
                        repository.platform = platform;
                        const repositoryPlatform = repository.platform;
                        const repositoryOwner = repository.owner.name;
                        var repositoryName = "";
                        if (repository.platform == "gitlab"){
                          repositoryName = repository.id;
                        }
                        else{
                           repositoryName = repository.name; 
                        }
    
                        // Fetch datas in parallel
                        const [issueResult, branchResult] = await Promise.all([
                            //this.commitService.getMany({ platform: repositoryPlatform, owner: repositoryOwner, repository: repositoryName }),
                            this.issueService.getMany({ platform: repositoryPlatform, owner: repositoryOwner, repository: repositoryName }),
                            this.branchService.getMany({ platform: repositoryPlatform, owner: repositoryOwner, repository: repositoryName })
                        ]);
    
                        // if (commitResult.succeeded) {
                        //     repository.commits = commitResult.data;
                        // } else {
                        //     console.warn("Failed to fetch commits for repository:", repositoryName, "Error:", commitResult.errors);
                        // }
    
                        if (issueResult.succeeded) {
                            repository.issues = issueResult.data;
                        } else {
                            console.warn("Failed to fetch issues for repository:", repositoryName, "Error:", issueResult.errors );
                        }

                        if (branchResult.succeeded) {
                            repository.branches = branchResult.data;
                        } else {
                            console.warn("Failed to fetch branches for repository:", repositoryName, "Error:", branchResult.errors );
                        }
    
                        return repository;
                    });
    
                    const repositories = await Promise.all(repositoryPromises);
                    allRepositories.push(...repositories);
                }
            } catch (error) {
                console.warn("Failed to fetch repositories for platform:", platform, "Error:", error);
            }
        }
    
        this.repositories = allRepositories;
        return this.repositories;
    }
    

    async getRepositoryByName(name: string): Promise<Repository | null> {
        if (!this.repositories || this.repositories.length === 0) {
            await this.getRepositories();
        }
    
        const repository = this.repositories.find(repo => repo.name === name);
    
        return repository || null;
    }
}

export default RepositoryManager;
