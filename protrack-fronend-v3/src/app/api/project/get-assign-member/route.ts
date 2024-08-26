import {
  getAssignMemberData,
  getStaffDetails,
  getTimelogsWithDetails,
} from "./get-assign-member";
import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("project-id");

  if (!projectId) {
    return NextResponse.json(
      { message: "Project ID is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch the task details with staff information
    const taskDetails = await getTimelogsWithDetails(projectId);

    // Calculate total work hours per staff member
    const totalWorkHoursArray = calculateTotalWorkHoursArray(taskDetails);

    console.log("totalWorkHoursArray:", totalWorkHoursArray);

    return NextResponse.json({
      message: "SUCCESS",
      totalWorkHours: totalWorkHoursArray,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "FAIL", error: error.message });
  }
}


function calculateTotalWorkHoursArray(taskDetails: any[]) {
  const workHoursMap = taskDetails.reduce((acc, detail) => {
    if (!acc[detail.staffid]) {
      acc[detail.staffid] = { username: detail.staffname, totalHours: 0 };
    }
    acc[detail.staffid].totalHours += detail.time;
    return acc;
  }, {} as Record<number, { username: string; totalHours: number }>);


  return Object.keys(workHoursMap).map((staffid) => ({
    staffid: parseInt(staffid),
    username: workHoursMap[staffid].username,
    totalHours: workHoursMap[staffid].totalHours,
  }));
}
