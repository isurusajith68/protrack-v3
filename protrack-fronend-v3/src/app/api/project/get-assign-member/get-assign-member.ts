import { db } from "@/db";

export const getAssignMemberData = async (projectId: any) => {
  let rows;
  const transaction = db.transaction(() => {
    try {
      const query = `SELECT * FROM projecttasksassigns WHERE projectid = ?;`;
      rows = db.prepare(query).all(projectId);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const getStaffDetails = async () => {
  let rows;
  const transaction = db.transaction(() => {
    try {
      const query = `SELECT * FROM staff;`;
      rows = db.prepare(query).all();
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const getTimelogsWithDetails = (projectId: any) => {
  try {
    const query = `
      SELECT 
        t.timelogid,
        t.staffid,
        td.timelogdetailid,
        td.taskid,
        td.time,
        td.rowindex,
        td.remark,
        td.taskitemid,
        td.count,
        s.staffname,
        s.staffid
      FROM 
        timelogsdetails td
      JOIN 
        timelogs t ON td.timelogid = t.timelogid
      JOIN
        staff s ON t.staffid = s.staffid
      WHERE 
        td.projectid = ?;
    `;

    const rows = db.prepare(query).all(projectId);
    return rows;
  } catch (error) {
    console.error("Failed to get timelogs with details:", error);
    return [];
  }
};
