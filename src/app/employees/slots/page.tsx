"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { handleExport } from "@/lib/export";
import { employeeSlots } from "@/lib/mock-data/employees";

const filters = [
  "Active Employees",
  "Available Slots",
  "Invitation Sent",
  "All Employees",
] as const;

type SlotFilter = (typeof filters)[number];

export default function EmployeeSlotsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<SlotFilter>("Active Employees");

  const filteredSlots = useMemo(() => {
    return employeeSlots.filter((slot) => {
      const matchesSearch =
        !search ||
        slot.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        slot.role.toLowerCase().includes(search.toLowerCase()) ||
        slot.outletParent.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) {
        return false;
      }

      switch (filter) {
        case "Available Slots":
          return slot.slotStatus === "Free";
        case "Invitation Sent":
          return slot.slotStatus === "Invited";
        case "All Employees":
        case "Active Employees":
        default:
          return true;
      }
    });
  }, [filter, search]);

  const exportSlots = () => {
    handleExport(
      "csv",
      [
        "Employee Name",
        "Role",
        "Assigned Outlet",
        "Expiration Date",
        "Slot Status",
        "Outlet Parent",
        "Employee Status",
      ],
      filteredSlots.map((slot) => [
        slot.employeeName,
        slot.role,
        slot.assignedOutlet,
        slot.expirationDate,
        slot.slotStatus,
        slot.outletParent,
        slot.employeeStatus,
      ]),
      "employee-slots"
    );
  };

  return (
    <div className="px-6 py-4">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-5">
          <h1 className="text-[2.6rem] font-bold leading-none text-[#2d3f54]">
            Employee Slots
          </h1>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Employees"
                className="w-full rounded-full border border-[#d7dde5] bg-white py-3 pl-5 pr-12 text-base text-[#425466] outline-none transition focus:border-[#4d9cf5] sm:w-[272px]"
              />
              <Search
                size={19}
                className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#7f8ea3]"
              />
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value as SlotFilter)}
              className="rounded-md border border-[#d7dde5] bg-white px-4 py-3 text-base text-[#364657] outline-none transition focus:border-[#4d9cf5]"
            >
              {filters.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={exportSlots}
          className="rounded-md bg-[#337ab7] px-6 py-3 text-lg font-medium text-white transition hover:bg-[#2a6598]"
        >
          Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-[15px] text-[#4c5967]">
          <thead>
            <tr className="bg-[#ececec] text-[#3f3f3f]">
              {[
                "Employee Name",
                "Role",
                "Assigned Outlet",
                "Expiration Date",
                "Slot Status",
                "Outlet Parent",
                "Employee Status",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-4 text-[15px] font-semibold first:rounded-l-sm last:rounded-r-sm"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSlots.length > 0 ? (
              filteredSlots.map((slot) => (
                <tr key={slot.id} className="bg-white">
                  <td className="border-b border-[#edf1f5] px-4 py-5">{slot.employeeName}</td>
                  <td className="border-b border-[#edf1f5] px-4 py-5">{slot.role}</td>
                  <td className="border-b border-[#edf1f5] px-4 py-5">{slot.assignedOutlet}</td>
                  <td className="border-b border-[#edf1f5] px-4 py-5">{slot.expirationDate}</td>
                  <td className="border-b border-[#edf1f5] px-4 py-5">{slot.slotStatus}</td>
                  <td className="border-b border-[#edf1f5] px-4 py-5">{slot.outletParent}</td>
                  <td className="border-b border-[#edf1f5] px-4 py-5">
                    {slot.employeeStatus === "Invite Employee" ? (
                      <button className="rounded-md bg-[#4fd4b8] px-6 py-3 text-base font-medium text-white transition hover:bg-[#41c2a8]">
                        Invite Employee
                      </button>
                    ) : (
                      <span
                        className={`inline-flex rounded-md px-4 py-2 text-sm font-medium ${
                          slot.employeeStatus === "Active"
                            ? "bg-[#e9f6ef] text-[#2f7a58]"
                            : "bg-[#fff5df] text-[#a86c0c]"
                        }`}
                      >
                        {slot.employeeStatus}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white">
                <td
                  colSpan={7}
                  className="border-b border-[#edf1f5] px-4 py-10 text-center text-base text-[#7f8ea3]"
                >
                  No employee slots match the current search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
