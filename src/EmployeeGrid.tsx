

// React Grid Logic
import  {  useState } from "react";
// import GridExample from './grid';
// Theme
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);
// Define an Employee interface
interface Employee {
  name: string;
  email: string;
  phoneNumber?: number;
  role: string;
  joiningDate: string | Date;
}

// Define the props type
interface EmployeeGridProps {
  employees?: Employee[]; // Optional prop with proper typing
}

const EmployeeGrid: React.FC<EmployeeGridProps> = ({ employees }) => {
  // If employees prop is provided, use it
  // Otherwise, fall back to localStorage
  const employeeData = employees || (() => {
    const savedData = localStorage.getItem('employees');
    return savedData ? JSON.parse(savedData) : [];
  })() as Employee[];



  const [rowData, setRowData] = useState<Employee[]>(employeeData);

  const columnDefs: ColDef[] = [
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Phone Number", field: "phoneNumber" },
    { headerName: "Role", field: "role" },
    { headerName: "Joining Date", field: "joiningDate", valueFormatter: params => new Date(params.value).toLocaleDateString() },
  ];

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4">Employee List</h2>
{/*       
      {employeeData.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employeeData.map((employee: Employee, index: number) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-lg">{employee.name}</h3>
              <p className="text-gray-600">{employee.role}</p>
              <p className="text-sm">Email: {employee.email}</p>
              {employee.phoneNumber && (
                <p className="text-sm">Phone: {employee.phoneNumber}</p>
              )}
              <p className="text-sm mt-2">
                Joined: {new Date(employee.joiningDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )} */}


<div style={{ width: "100%", height: "500px" }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
    </div>
  );
};

export default EmployeeGrid;