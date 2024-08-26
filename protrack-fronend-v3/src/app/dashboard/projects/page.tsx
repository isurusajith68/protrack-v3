"use client";

import AssignMember from "@/app/components/assign-member/assign-member";
import Navbar from "@/app/components/navbar/navbar";
import React, { useEffect, useState } from "react";

const WorkTable = () => {
  const [activeProjectData, setActiveProjectData] = useState([]);

  useEffect(() => {
    getActiveProjectData();
  }, []);
  const getActiveProjectData = async () => {
    const fetchData = async () => {
      const response = await fetch("api/project/get-active-projects");
      const res = await response.json();
      // console.log("res", res);
      setActiveProjectData(res.activeProjects);
    };
    fetchData().catch(console.error);
  };

  return (
    <div>
      {" "}
      <Navbar />
      <div className="p-5">
        <div>
          {activeProjectData?.length > 0 && (
            <div className=" flex-col gap-4">
              <table className="border-collapse">
                <thead>
                  <tr className="bg-blue-300">
                    <th className=" px-4 py-2 text-left text-blue-900">
                      Active Projects
                    </th>
                    <tr>
                      <th className=" px-4 py-2 w-[150px] text-left text-blue-900">
                        Member Name
                      </th>
                      <th className="px-4 py-2 text-left text-blue-900">
                        Work Hours
                      </th>
                    </tr>
                  </tr>
                </thead>
                <tbody>
                  {activeProjectData.map((project) => (
                    <React.Fragment key={project.projectid}>
                      <tr>
                        <td
                          className="border-b px-4 py-2 font-semibold text-gray-800"
                          rowSpan={project.members?.length || 1}
                        >
                          {project.projectname}
                        </td>
                        <AssignMember projectId={project.projectid} />
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default WorkTable;
