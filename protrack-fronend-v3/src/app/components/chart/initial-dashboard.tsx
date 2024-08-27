"use client";

import React, { useEffect, useState } from "react";
import ChartProject from "./dashboard-project";
import DashboardIntro from "./dashboard-intro";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AssignMember from "../assign-member/assign-member";
import { useSession } from "next-auth/react";

const InitialDashboard = ({
  staffCount,
  projectCount,
}: {
  staffCount: any;
  projectCount: any;
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const tmpUser = session?.user;
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
      <div className="flex flex-col gap-1 pl-1 overflow-x-auto w-full sm:w-[80vw] sm:max-w-[80vw]">
        {activeProjectData?.length == 0 ? (
          <DashboardIntro />
        ) : (
          <div className="flex gap-2 flex-wrap">
            <Card className="w-1/3">
              <CardBody>
                <span className="font-semibold text-blue-900 text-lg text-blueGray-700 border-b-2">
                  Staff details
                </span>
                <div className="flex mt-1">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500 mt-4">
                    <span className="flex items-center justify-center text-xl">
                      {staffCount}
                    </span>
                  </div>
                  <Button
                    color="primary"
                    className="absolute right-0 bottom-0 mb-4 mr-4 flex items-center"
                    size="sm"
                    variant="bordered"
                    // endContent={<MdGridView className="h-4 w-4" />}
                    onClick={() => router.push("/staff")}
                  >
                    View Details
                  </Button>
                </div>
              </CardBody>
            </Card>
            <Card className="w-1/3">
              <CardBody>
                <div className="flex mt-1">
                  <span className="font-semibold text-blue-900 text-lg text-blueGray-700 border-b-2">
                    Monthly calender
                  </span>

                  <Button
                    color="primary"
                    className="absolute right-0 bottom-0 mb-4 mr-4 flex items-center"
                    size="sm"
                    variant="bordered"
                    // endContent={<MdGridView className="h-4 w-4" />}
                    onClick={() => router.push("/calender")}
                  >
                    View Calender
                  </Button>
                </div>
              </CardBody>
            </Card>
            {/* <Card className="w-1/3">
              <CardBody>
                <span className="font-semibold text-blue-900 text-lg text-blueGray-700 border-b-2">
                  monthly calender
                </span>
                <div className="flex mt-1">
                  <Button
                    color="primary"
                    className="absolute right-0 bottom-0 mb-4 mr-4 flex items-center"
                    size="sm"
                    variant="bordered"
                    // endContent={<MdGridView className="h-4 w-4" />}
                    onClick={() => router.push("/calender")}
                  >
                    View Details
                  </Button>
                </div>
              </CardBody>
            </Card> */}
          </div>
        )}
        {tmpUser?.role.includes("systemadmin") && (
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
                      {activeProjectData?.map((project) => (
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
        )}
      </div>
    </div>
  );
};

export default InitialDashboard;
//get-active-projects
