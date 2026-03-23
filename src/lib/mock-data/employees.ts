export type EmployeeSlot = {
  id: string;
  employeeName: string;
  role: string;
  assignedOutlet: string;
  expirationDate: string;
  slotStatus: "Active" | "Invited" | "Free";
  outletParent: string;
  employeeStatus: "Active" | "Invite Employee" | "Invitation Sent";
};

export const employeeSlots: EmployeeSlot[] = [
  {
    id: "slot-1",
    employeeName: "Nadia Putri",
    role: "Administrator",
    assignedOutlet: "Outlet 1",
    expirationDate: "25 Mar 2026",
    slotStatus: "Active",
    outletParent: "Outlet 1",
    employeeStatus: "Active",
  },
  {
    id: "slot-2",
    employeeName: "Bima Saputra",
    role: "Cashier",
    assignedOutlet: "Outlet 1",
    expirationDate: "25 Mar 2026",
    slotStatus: "Invited",
    outletParent: "Outlet 1",
    employeeStatus: "Invitation Sent",
  },
  {
    id: "slot-3",
    employeeName: "-",
    role: "-",
    assignedOutlet: "-",
    expirationDate: "25 Mar 2026",
    slotStatus: "Free",
    outletParent: "Outlet 1",
    employeeStatus: "Invite Employee",
  },
  {
    id: "slot-4",
    employeeName: "-",
    role: "-",
    assignedOutlet: "-",
    expirationDate: "25 Mar 2026",
    slotStatus: "Free",
    outletParent: "Outlet 1",
    employeeStatus: "Invite Employee",
  },
  {
    id: "slot-5",
    employeeName: "-",
    role: "-",
    assignedOutlet: "-",
    expirationDate: "25 Mar 2026",
    slotStatus: "Free",
    outletParent: "Outlet 1",
    employeeStatus: "Invite Employee",
  },
];

export const employeeAccessRoles = [
  {
    id: "administrator",
    roleName: "Administrator",
    employeesAssigned: "-",
    access: "App & Back-office",
    privilegeCount: 22,
  },
  {
    id: "cashier",
    roleName: "Cashier",
    employeesAssigned: "-",
    access: "App Only",
    privilegeCount: 8,
  },
];

export const pinAdministrators = [
  {
    id: "admin-1",
    outlet: "Outlet 1",
    employeeName: "-",
    pin: "-",
  },
];

export const pinFeatures = [
  {
    id: "print-bill",
    label: "Print Bill",
  },
  {
    id: "manage-open-bills",
    label: "Manage All Open Bills",
    hint: "Required to complete transactions",
  },
  {
    id: "apply-discounts",
    label: "Apply Discounts to Bills and Items",
  },
  {
    id: "manage-discounts",
    label: "Manage Discounts",
  },
  {
    id: "issue-refunds",
    label: "Issue Refunds",
  },
  {
    id: "resend-receipts",
    label: "Resend Receipts",
  },
];
