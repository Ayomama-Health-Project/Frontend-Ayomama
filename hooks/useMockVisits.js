import { useState } from "react";
import { MOCK_VISITS } from "../utils/mockData";

export default function useMockVisits() {
  const [visits, setVisits] = useState(MOCK_VISITS);
  const [loading, setLoading] = useState(false);

  const fetchVisits = async () => {
    setLoading(true);
    setTimeout(() => {
      setVisits(MOCK_VISITS);
      setLoading(false);
    }, 100);
    return { success: true };
  };

  const createSchedule = async (visitData) => {
    setVisits((prev) => [
      ...prev,
      {
        id: `visit-${Date.now()}`,
        ...visitData,
      },
    ]);
    return { success: true, message: "Visit saved locally" };
  };

  return {
    visits,
    loading,
    fetchVisits,
    createSchedule,
  };
}
