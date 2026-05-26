export type TIssueType = "bug" | "feature_request";
export type TIssueStatus = "open" | "in_progress" | "resolved";

export interface IIssue {
  title: string;
  description: string;
  type: TIssueType;
  status?: TIssueStatus;
  reporter_id: number;
}
