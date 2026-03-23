import { employeeAccessRoles } from "@/lib/mock-data/employees";

export default function EmployeeAccessPage() {
  return (
    <div className="px-6 py-4">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <h1 className="text-[2.6rem] font-bold leading-none text-[#2d3f54]">
          Employee Access
        </h1>

        <button className="rounded-md bg-[#337ab7] px-6 py-3 text-lg font-medium text-white transition hover:bg-[#2a6598]">
          Create Employee Role
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-[15px] text-[#4c5967]">
          <thead>
            <tr className="bg-[#ececec] text-[#3f3f3f]">
              {["Role Name", "Employees Assigned", "Access"].map((heading) => (
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
            {employeeAccessRoles.map((role) => (
              <tr key={role.id} className="bg-white">
                <td className="border-b border-[#edf1f5] px-4 py-5 text-[1.05rem] text-[#555f6d]">
                  {role.roleName}
                </td>
                <td className="border-b border-[#edf1f5] px-4 py-5 text-[1.05rem] text-[#555f6d]">
                  {role.employeesAssigned}
                </td>
                <td className="border-b border-[#edf1f5] px-4 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[1.05rem] text-[#555f6d]">{role.access}</span>
                    <button className="rounded-md bg-[#61c8ae] px-8 py-3 text-base font-medium text-white transition hover:bg-[#54b69d]">
                      {role.privilegeCount} Privileges
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
