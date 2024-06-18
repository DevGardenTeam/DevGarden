import RepositoryManager from "../managers/RepositoryManager";

export default class MetricsUtils {

    //General Metrics
    static commitsMark = 10;
    static issuesMark = 10;

    //Commits with Month
    static qualityCommitMetrics = {
        priorities: [{ label: "High", value: "3" }, { label: "Medium", value: "2" }, { label: "Low", value: "1" }, { label: "None", value: "0" }]
    };

    static selectedCommitMetrics = {
        selectedMonth: 1,
        selectedPriority: "High"
    };

    static getQualityCommitMetrics() {
        return this.qualityCommitMetrics;
    }

    static getSelectedCommitMetrics() {
        return this.selectedCommitMetrics;
    }

    static setSelectedCommitMonth(month: number) {
        this.selectedCommitMetrics.selectedMonth = month;
    }

    static setSelectedCommitPriority(priority: string) {
        this.selectedCommitMetrics.selectedPriority = priority;
    }

    //Issues with Percentage
    static qualityIssueMetrics = {
        priorities: [{ label: "High", value: "3" }, { label: "Medium", value: "2" }, { label: "Low", value: "1" }, { label: "None", value: "0" }]
    };

    static selectedIssueMetrics = {
        selectedPercentage: 1,
        selectedPriority: "None"
    };

    static getQualityIssueMetrics() {
        return this.qualityCommitMetrics;
    }

    static getSelectedIssueMetrics() {
        return this.selectedIssueMetrics;
    }

    static setSelectedIssuePercentage(percentage: number) {
        this.selectedIssueMetrics.selectedPercentage = percentage;
    }

    static setSelectedIssuePriority(priority: string) {
        this.selectedIssueMetrics.selectedPriority = priority;
    }



    // CALCULATE COMMITS METRICS
    static calculateCommitsMetric = async (repositoryName: string) => {
        var repositoryManager = RepositoryManager.getInstance();
        try {
            const repo = await repositoryManager.getRepositoryByName(repositoryName);
            if (!repo) {
                throw new Error("Repository not found");
            }

            var selectedBranch = repo.branches[0];

            if (repo.branches.length > 0) {
                const mainBranch = repo.branches.find(branch => branch.name === 'main');
                const masterBranch = repo.branches.find(branch => branch.name === 'master');
                selectedBranch = mainBranch || masterBranch || repo.branches[0];

                if (selectedBranch.commits.length === 0){
                    this.commitsMark = 0;
                    return;
                }
            }

            // Sort the commits by date in descending order
            selectedBranch.commits.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

            const lastCommitDate = new Date(selectedBranch.commits[0].date);
            const currentDate = new Date();
            const selectedMonth = this.selectedCommitMetrics.selectedMonth;

            // Calculate the target dates
            const targetDate1 = new Date(currentDate);
            targetDate1.setMonth(targetDate1.getMonth() - selectedMonth);

            const targetDate2 = new Date(currentDate);
            targetDate2.setMonth(targetDate2.getMonth() - Math.floor(selectedMonth / 2));

            // Determine the category
            switch (true) {
                case (lastCommitDate >= targetDate1):
                    this.commitsMark = 20;
                    break;
                case (lastCommitDate >= targetDate2 && lastCommitDate < targetDate1):
                    this.commitsMark = 10;
                    break;
                default:
                    this.commitsMark = 0;
                    break;
            }
        } catch (error: any) {
            throw new Error(`Failed to calculate commit metrics: ${error.message}`);
        }
    }

    

    // CALCULATE ISSUES METRICS
    static calculateIssuesMetric = async (repositoryName: string) => {
        var repositoryManager = RepositoryManager.getInstance();
        try {
            const repo = await repositoryManager.getRepositoryByName(repositoryName);
            if (!repo) {
                throw new Error("Repository not found");
            }

            if (repo.issues.length === 0) {
                this.issuesMark = 20;
                return;
            }

            const openIssues = repo.issues.filter((issue: any) => issue.state === "open").length;
            const totalIssues = repo.issues.length;
            const openIssuesPercentage = (openIssues / totalIssues) * 100;

            const lowerBound = this.selectedIssueMetrics.selectedPercentage - 10;
            const upperBound = this.selectedIssueMetrics.selectedPercentage + 10;

            switch (true) {
                case (openIssuesPercentage < lowerBound):
                    this.issuesMark = 20;
                    break;
                case (openIssuesPercentage > upperBound):
                    this.issuesMark = 0;
                    break;
                default:
                    this.issuesMark = 10;
                    break;
            }
        } catch (error: any) {
            throw new Error(`Failed to calculate issues metrics: ${error.message}`);
        }
    }


    // CALCULATE AVERAGE METRICS
    static calculateAverageMetric = async (repositoryName: string) => {
        var repositoryManager = RepositoryManager.getInstance();

        await this.calculateCommitsMetric(repositoryName);
        await this.calculateIssuesMetric(repositoryName);
    
        const commitPriorityString = this.qualityCommitMetrics.priorities.find(p => p.label === this.selectedCommitMetrics.selectedPriority)?.value || "1";
        const issuePriorityString = this.qualityIssueMetrics.priorities.find(p => p.label === this.selectedIssueMetrics.selectedPriority)?.value || "1";
    
        const commitPriority = Number(commitPriorityString);
        const issuePriority = Number(issuePriorityString);
    
        if (isNaN(commitPriority) || isNaN(issuePriority)) {
            throw new Error("Invalid priority value");
        }
    
        const commitWeightedMark = this.commitsMark * commitPriority;
        const issueWeightedMark = this.issuesMark * issuePriority;
    
        console.log(commitWeightedMark);
        console.log(issueWeightedMark);

        const totalPriority = commitPriority + issuePriority;
        const averageMetric = (commitWeightedMark + issueWeightedMark) / totalPriority;
    
        try {
            const repo = await repositoryManager.getRepositoryByName(repositoryName);
            
            if (!repo) {
                throw new Error("Repository not found");
            }
    
            switch (true) {
                case (averageMetric > 15):
                    repo.status = "good";
                    break;
                case (averageMetric < 10):
                    repo.status = "bad";
                    break;
                default:
                    repo.status = "ok";
                    break;
            }
            return repo.status;
        } catch (error: any) {
            throw new Error(`Failed to calculate issues metrics: ${error.message}`);
        }                
    }    
}   
  