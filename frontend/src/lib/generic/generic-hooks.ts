import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Validation } from "@/lib/core/validation";

export const createCrudHooks = <
  ReadIndex,
  ReadShow,
  CreateForm,
  UpdateForm
>(config: {
  queryKey: {
    list: () => readonly unknown[];
    detail: (id: number) => readonly unknown[];
  };
  service: {
    index: () => Promise<ReadIndex[]>;
    show: (id: number) => Promise<ReadShow>;
    create?: (data: CreateForm) => Promise<ReadShow>;
    update?: (id: number, data: UpdateForm) => Promise<ReadShow>;
    delete?: (id: number) => Promise<void>;
  };
}) => {
  const { service, queryKey } = config;

  // Enterprise pattern: index() - no params needed
  const index = () => {
    return useQuery({
      queryKey: queryKey.list(),
      queryFn: service.index,
    });
  };

  // Enterprise pattern: show(id)
  const show = (id: number) => {
    const validId = Validation.requireValidId(id);
    return useQuery({
      queryKey: queryKey.detail(validId),
      enabled: Number.isFinite(id),
      queryFn: () => service.show(validId),
    });
  };

  // Enterprise pattern: create()
  const create = () => {
    const createService = service.create;
    if (!createService) {
      throw new Error("Create is not supported for this resource");
    }

    const qc = useQueryClient();

    return useMutation({
      mutationFn: createService,
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: queryKey.list() });
      },
    });
  };

  // Enterprise pattern: update()
  const update = () => {
    const updateService = service.update;
    if (!updateService) {
      throw new Error("Update is not supported for this resource");
    }

    const qc = useQueryClient();

    return useMutation({
      mutationFn: ({ id, data }: { id: number; data: UpdateForm }) => {
        const validId = Validation.requireValidId(id);
        return updateService(validId, data);
      },
      onSuccess: (_data: unknown, vars: { id: number }) => {
        qc.invalidateQueries({ queryKey: queryKey.list() });
        qc.invalidateQueries({ queryKey: queryKey.detail(vars.id) });
      },
    });
  };

  // Enterprise pattern: remove() (alias for delete)
  const remove = () => {
    const deleteService = service.delete;
    if (!deleteService) {
      throw new Error("Delete is not supported for this resource");
    }

    const qc = useQueryClient();

    return useMutation({
      mutationFn: (id: number) => {
        const validId = Validation.requireValidId(id);
        return deleteService(validId);
      },
      onSuccess: (_data: unknown, id: number) => {
        qc.invalidateQueries({ queryKey: queryKey.list() });
        qc.invalidateQueries({ queryKey: queryKey.detail(id) });
      },
    });
  };

  // Return hooks object directly - supports useProduk.index()
  // Also add legacy properties for backward compatibility: useProduk.useIndex()
  return {
    index,
    show,
    create,
    update,
    remove,
    delete: remove, // alias for remove
    
    // Legacy patterns
    useIndex: index,
    useShow: show,
    useCreate: create,
    useUpdate: update,
    useDelete: remove,
    useRemove: remove,
  };
};
