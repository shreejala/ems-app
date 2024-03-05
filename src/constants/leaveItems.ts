export const leaveReasonItem = [
  {label: "Work from home", value: "Work from home"},
  {label: "Personal leave", value: "Personal leave"},
  {label: "Sick Leave", value: "Sick Leave"},
  {label: "Floating Leave", value: "Floating Leave"},
  {label: "Menstruation Leave", value: "Menstruation Leave"},
];
export const leaveTypeItem = [
  {label: "Full Day", value: "Full Day"},
  {label: "First Half", value: "First Half"},
  {label: "Second Half", value: "Second Half"},
];

export enum leaveReasonEnum {
  PersonalLeave = "Personal leave",
  SickLeave = "Sick Leave",
  FloatingLeave = "Floating Leave",
  MenstruationLeave = "Menstruation Leave",
  WorkFromHome = "Work from home",
}

export const leaveReasons: string[] = [
  leaveReasonEnum.PersonalLeave,
  leaveReasonEnum.SickLeave,
  leaveReasonEnum.FloatingLeave,
  leaveReasonEnum.MenstruationLeave,
  leaveReasonEnum.WorkFromHome,
];

export enum leaveStatus {
  Accept = "Accept",
  Pending = "Pending",
  Reject = "Reject",
}
