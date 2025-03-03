
import  {  useState } from "react";

import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface Employee {
  name: string;
  email: string;
  phoneNumber?: number;
  role: string;
  joiningDate: string | Date;
}


interface EmployeeGridProps {
  employees?: Employee[]; 
}

const EmployeeGrid: React.FC<EmployeeGridProps> = ({ employees }) => {
  
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


<div style={{ width: "100%", height: "500px" }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
    </div>
  );
};

export default EmployeeGrid;