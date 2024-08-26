import { useEffect, useState } from "react";

const AssignMember = ({ projectId }) => {
  const [totalWorkHours, setTotalWorkHours] = useState([]);

  useEffect(() => {
    const getAssignMemberData = async () => {
      const fetchData = async () => {
        const response = await fetch(
          `api/project/get-assign-member?project-id=${projectId}`
        );
        const res = await response.json();
        setTotalWorkHours(res.totalWorkHours);
      };
      fetchData().catch(console.error);
    };
    getAssignMemberData();
  }, [projectId]);

  return (
    <>
      {totalWorkHours.map((item, index) => (
        <tr key={item.staffid} className="border-b hover:bg-blue-50">
          <td className=" w-[150px] px-4 py-2 text-gray-700">{item.username}</td>
          <td className="px-4 py-2 text-gray-700">{item.totalHours}</td>
        </tr>
      ))}
    </>
  );
};

export default AssignMember;
