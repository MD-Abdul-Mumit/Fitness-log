"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
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

// In-memory cache to maintain referential equality and avoid re-render loops
let cachedPlanRaw: string | null = null;
let cachedPlanParsed: WorkoutItem[] = [];

let cachedSavedRaw: string | null = null;
let cachedSavedParsed: WorkoutItem[] = [];

// Single static cached empty array for SSR / empty fallbacks
const EMPTY_LIST: WorkoutItem[] = [];

// Custom event to notify subscribers of local storage updates across components
const STORAGE_EVENT = "fitlog_storage_update";

function notifyStorageChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(STORAGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(STORAGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getTodayPlanSnapshot(): WorkoutItem[] {
  if (typeof window === "undefined") return EMPTY_LIST;
  try {
    const raw = localStorage.getItem("fitlog_today_plan");
    if (raw !== cachedPlanRaw) {
      cachedPlanRaw = raw;
      cachedPlanParsed = raw ? JSON.parse(raw) : EMPTY_LIST;
    }
    return cachedPlanParsed;
  } catch {
    return EMPTY_LIST;
  }
}

function getSavedListSnapshot(): WorkoutItem[] {
  if (typeof window === "undefined") return EMPTY_LIST;
  try {
    const raw = localStorage.getItem("fitlog_saved_list");
    if (raw !== cachedSavedRaw) {
      cachedSavedRaw = raw;
      cachedSavedParsed = raw ? JSON.parse(raw) : EMPTY_LIST;
    }
    return cachedSavedParsed;
  } catch {
    return EMPTY_LIST;
  }
}

// Cached server snapshot returning the exact same object reference
const getServerSnapshot = (): WorkoutItem[] => EMPTY_LIST;

export const WorkoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Read snapshots directly using cached static references
  const todayPlan = useSyncExternalStore(
    subscribe,
    getTodayPlanSnapshot,
    getServerSnapshot,
  );
  const savedList = useSyncExternalStore(
    subscribe,
    getSavedListSnapshot,
    getServerSnapshot,
  );

  const getItemId = (item: WorkoutItem): string =>
    String(item.id || item._id || item.bookId || "");

  const addToTodayPlan = useCallback((item: WorkoutItem): boolean => {
    const current = getTodayPlanSnapshot();
    const id = getItemId(item);

    if (current.some((p) => getItemId(p) === id)) {
      setTimeout(
        () => toast.warning("This workout is already in Today's Plan!"),
        0,
      );
      return false;
    }

    if (current.length >= 5) {
      setTimeout(
        () =>
          toast.error(
            "Cap of five lifts reached for today! Finish them first.",
          ),
        0,
      );
      return false;
    }

    const updated = [...current, { ...item, completed: false }];
    localStorage.setItem("fitlog_today_plan", JSON.stringify(updated));
    notifyStorageChange();

    setTimeout(() => toast.success("Added to today's plan!"), 0);
    return true;
  }, []);

  const addToSavedList = useCallback((item: WorkoutItem): boolean => {
    const current = getSavedListSnapshot();
    const id = getItemId(item);

    if (current.some((s) => getItemId(s) === id)) {
      setTimeout(() => toast.warning("Workout is already saved!"), 0);
      return false;
    }

    const updated = [...current, item];
    localStorage.setItem("fitlog_saved_list", JSON.stringify(updated));
    notifyStorageChange();

    setTimeout(() => toast.info("Saved for later!"), 0);
    return true;
  }, []);

  const removeFromTodayPlan = useCallback((id: string | number) => {
    const current = getTodayPlanSnapshot();
    const updated = current.filter((p) => getItemId(p) !== String(id));
    localStorage.setItem("fitlog_today_plan", JSON.stringify(updated));
    notifyStorageChange();
    setTimeout(() => toast.info("Removed from today's plan"), 0);
  }, []);

  const removeFromSavedList = useCallback((id: string | number) => {
    const current = getSavedListSnapshot();
    const updated = current.filter((s) => getItemId(s) !== String(id));
    localStorage.setItem("fitlog_saved_list", JSON.stringify(updated));
    notifyStorageChange();
    setTimeout(() => toast.info("Removed from saved list"), 0);
  }, []);

  const markAsDone = useCallback((id: string | number) => {
    const current = getTodayPlanSnapshot();
    let isCompleted = false;

    const updated = current.map((item) => {
      if (getItemId(item) === String(id)) {
        const next = !item.completed;
        isCompleted = next;
        return { ...item, completed: next };
      }
      return item;
    });

    localStorage.setItem("fitlog_today_plan", JSON.stringify(updated));
    notifyStorageChange();

    setTimeout(() => {
      if (isCompleted) {
        toast.success("Workout marked as done! Strong work! 🔥");
      }
    }, 0);
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
