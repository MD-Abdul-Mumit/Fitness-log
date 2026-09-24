"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { WorkoutItem } from "@/types/book";
import { toast } from "react-toastify";

interface WorkoutContextType {
  todayPlan: WorkoutItem[];
  savedList: WorkoutItem[];
  addToTodayPlan: (item: WorkoutItem) => boolean;
  addToSavedList: (item: WorkoutItem) => boolean;
  removeFromTodayPlan: (id: string | number) => void;
  removeFromSavedList: (id: string | number) => void;
  markAsDone: (id: string | number) => void;
  isPlanFull: boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todayPlan, setTodayPlan] = useState<WorkoutItem[]>([]);
  const [savedList, setSavedList] = useState<WorkoutItem[]>([]);
  const isHydrated = useRef(false);

  const getItemId = (item: WorkoutItem): string =>
    String(item.id || item._id || item.bookId || "");

  // 1. Hydrate state from localStorage safely on client mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_today_plan");
      const storedSaved = localStorage.getItem("fitlog_saved_list");

      if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
      if (storedSaved) setSavedList(JSON.parse(storedSaved));
    } catch (e) {
      console.error("Failed to read localStorage:", e);
    } finally {
      isHydrated.current = true;
    }
  }, []);

  // 2. Sync to localStorage ONLY after client has hydrated
  useEffect(() => {
    if (!isHydrated.current) return;

    try {
      localStorage.setItem("fitlog_today_plan", JSON.stringify(todayPlan));
      localStorage.setItem("fitlog_saved_list", JSON.stringify(savedList));
    } catch (e) {
      console.error("Failed to write to localStorage:", e);
    }
  }, [todayPlan, savedList]);

  const addToTodayPlan = useCallback(
    (item: WorkoutItem): boolean => {
      const id = getItemId(item);

      if (todayPlan.some((p) => getItemId(p) === id)) {
        setTimeout(() => toast.warning("This workout is already in Today's Plan!"), 0);
        return false;
      }

      if (todayPlan.length >= 5) {
        setTimeout(
          () => toast.error("Cap of five lifts reached for today! Finish them first."),
          0
        );
        return false;
      }

      setTodayPlan((prev) => [...prev, { ...item, completed: false }]);
      setTimeout(() => toast.success("Added to today's plan!"), 0);
      return true;
    },
    [todayPlan]
  );

  const addToSavedList = useCallback(
    (item: WorkoutItem): boolean => {
      const id = getItemId(item);

      if (savedList.some((s) => getItemId(s) === id)) {
        setTimeout(() => toast.warning("Workout is already saved!"), 0);
        return false;
      }

      setSavedList((prev) => [...prev, item]);
      setTimeout(() => toast.info("Saved for later!"), 0);
      return true;
    },
    [savedList]
  );

  const removeFromTodayPlan = useCallback((id: string | number) => {
    setTodayPlan((prev) => prev.filter((p) => getItemId(p) !== String(id)));
    setTimeout(() => toast.info("Removed from today's plan"), 0);
  }, []);

  const removeFromSavedList = useCallback((id: string | number) => {
    setSavedList((prev) => prev.filter((s) => getItemId(s) !== String(id)));
    setTimeout(() => toast.info("Removed from saved list"), 0);
  }, []);

  const markAsDone = useCallback((id: string | number) => {
    setTodayPlan((prev) =>
      prev.map((item) => {
        if (getItemId(item) === String(id)) {
          const next = !item.completed;
          setTimeout(() => {
            if (next) toast.success("Workout marked as done! Strong work! 🔥");
          }, 0);
          return { ...item, completed: next };
        }
        return item;
      })
    );
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
        todayPlan,
        savedList,
        addToTodayPlan,
        addToSavedList,
        removeFromTodayPlan,
        removeFromSavedList,
        markAsDone,
        isPlanFull: todayPlan.length >= 5,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error("useWorkout must be wrapped in WorkoutProvider");
  return ctx;
};