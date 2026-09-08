import { useState } from "react";
import {
  MOCK_EMERGENCY_CONTACTS,
  MOCK_HOSPITALS,
} from "../utils/mockData";

export default function useMockEmergency() {
  const [emergencyContacts, setEmergencyContacts] = useState(
    MOCK_EMERGENCY_CONTACTS,
  );
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmergencyContacts = async () => {
    setLoading(true);
    setTimeout(() => {
      setEmergencyContacts(MOCK_EMERGENCY_CONTACTS);
      setLoading(false);
    }, 100);
    return { success: true };
  };

  const fetchNearbyHospitals = async () => {
    setLoading(true);
    setTimeout(() => {
      setHospitals(MOCK_HOSPITALS);
      setLoading(false);
    }, 150);
    return { success: true };
  };

  return {
    emergencyContacts,
    hospitals,
    loading,
    fetchEmergencyContacts,
    fetchNearbyHospitals,
  };
}
