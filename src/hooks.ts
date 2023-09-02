import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    delMachine, getMachines, newMachine
} from "./db";
import { displayError, displaySuccess } from "./utils";

export const useMachinesList = () => {
    const { data } = useQuery({
        queryKey: ["machines"],
        queryFn: getMachines,
    });
    return data;
};



export const useNewMachine = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: newMachine,
        onSuccess: () => {
            displaySuccess("added new machine");
            queryClient.invalidateQueries({ queryKey: ["machines"] });
        },
        onError: displayError,
    });
    return mutation;
};



export const useDelMachine = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: delMachine,
        onSuccess: () => {
            displaySuccess("deleted");
            queryClient.invalidateQueries({ queryKey: ["machines"] });
        },
        onError: displayError,
    });
    return mutation;
};

