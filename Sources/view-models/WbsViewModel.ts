import { useEffect, useState } from 'react';
import { Task } from '../model/Task';
import { Wbs } from '../model/Wbs';

export const useWbsViewModel = (owner: string, repository: string) => {
  const [wbsTasks, setWbsTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [wbsData, setWbsData] = useState<Wbs>(new Wbs(new Map()));

  // Mock des données pour l'instant
  const initialWbsData: Wbs = new Wbs(new Map<string, Task[]>([
    ['C - Gestion de projet', [
      new Task('C1', 'Faire le WBS'),
      new Task('C2', 'Faire le GANTT')
    ]],
  ]));

  const fetchWbsTasks = async () => {
    try {
      const allTasks = Array.from(wbsData.tasks.values()).flat();
      setWbsTasks(allTasks);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWbsCategories = async () => {
    try {
      const categories = Array.from(wbsData.tasks.keys());
      return categories;
    } catch (error: any) {
      setError(error.message);
      return [];
    }
  };

  const fetchWbsTasksByCategory = async (category: string) => {
    try {
      const tasksForCategory = wbsData.tasks.get(category) || [];
      return tasksForCategory;
    } catch (error: any) {
      setError(error.message);
      return [];
    }
  };

  const addWbsCategory = async (category: string) => {
    try {
      const updatedTasks = new Map(wbsData.tasks);
      updatedTasks.set(category, []);
      const updatedWbsData = new Wbs(updatedTasks);
      setWbsData(updatedWbsData);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const addWbsTaskToCategory = async (category: string, task: Task) => {
    try {
      const tasksForCategory = wbsData.tasks.get(category) || [];
      const updatedTasks = new Map(wbsData.tasks);
      updatedTasks.set(category, [...tasksForCategory, task]);
      const updatedWbsData = new Wbs(updatedTasks);
      setWbsData(updatedWbsData);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setWbsData(initialWbsData);
    setLoading(false);
  }, []);

  return { 
    wbsTasks, 
    loading, 
    error, 
    fetchWbsTasks, 
    fetchWbsCategories, 
    fetchWbsTasksByCategory,
    addWbsCategory,
    addWbsTaskToCategory 
  };
};
