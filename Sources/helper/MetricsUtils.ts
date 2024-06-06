export default class MetricsUtils {

    //General Metrics

    //Commits with Month
    static qualityCommitMetrics = {
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        priorities: [{ label: "High", value: "high" }, { label: "Medium", value: "medium" }, { label: "Low", value: "low" }]
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
}
  