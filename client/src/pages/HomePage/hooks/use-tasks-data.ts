import { useEffect, useState } from "react";
import { ManyResponse } from "../../../api/_shared/many-response.model";
import { TaskModel } from "../../../api/task/task.model";
import { TaskService } from "../../../api/task/task.service";
import { useFormik } from "formik";

export const useTasksData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasBeenLoaded, setHasBeenLoaded] = useState<boolean>(false);
  const [data, setData] = useState<ManyResponse<TaskModel>>({
    entities: [],
    count: 0,
  });

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);

      try {
        const { data } = await TaskService.list(abortController.signal);

        setData(data);
        setHasBeenLoaded(true);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  const [createTaskLoading, setCreateTaskLoading] = useState<boolean>(false);

  const createForm = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: async ({ title }) => {
      setCreateTaskLoading(true);

      try {
        const { data } = await TaskService.create({ title });

        setData((prev) => ({ entities: [data.entity, ...prev.entities], count: prev.count + 1 }));
        createForm.resetForm();
      } catch (err) {}

      setCreateTaskLoading(false);
    },
  });

  const remove = async (id: string) => {
    try {
      await TaskService.remove(id);

      setData((prev) => ({
        entities: prev.entities.filter((entity) => entity._id !== id),
        count: prev.count - 1,
      }));
    } catch (err) {}
  };

  return { data, loading, hasBeenLoaded, createForm, createTaskLoading, remove };
};
