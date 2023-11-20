import { UsageStatsContext } from "@contexts/UsageStatsContext";
import { useContext } from "react";

export function useUsageStats(){
  const context = useContext(UsageStatsContext)
  return context
}