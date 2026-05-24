export type TIssueType = "bug" | "feature_request";

export interface IIssue {
  title: string;
  description: string;
  type: TIssueType;
  status?: "open" | "in_progress" | "resolved";
  reporter_id: number;
}
