import { Input } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form"

import { Button } from "@nextui-org/react";
import { IconDeviceDesktopPlus } from '@tabler/icons-react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

import { newMachine, type Machine } from "./db";
import { displayError, displaySuccess } from "./utils";

export default function NewMachine() {
    const queryClient = useQueryClient();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Machine>()
    return (
        <>
            <Button endContent={<IconDeviceDesktopPlus></IconDeviceDesktopPlus>} onPress={onOpen}>
                New Machine
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => {
                        const { mutate } = useMutation({
                            mutationFn: newMachine,
                            onSuccess: () => {
                                displaySuccess("added new machine");
                                queryClient.invalidateQueries({ queryKey: ["machines"] });
                                onClose()
                            },
                            onError: (e) => { displayError(e) },
                        });
                        return (
                            <>
                                <ModalHeader className="flex flex-col gap-1">New Machine</ModalHeader>
                                <form className="flex flex-col gap-4 " onSubmit={handleSubmit(m => {
                                    console.log("on submit called");

                                    mutate(m)
                                })}>
                                    <ModalBody>
                                        <Input isRequired label="Name" placeholder="Enter machines name" {...register('name', { minLength: 2 })}
                                            validationState={errors.name ? "invalid" : "valid"}
                                            errorMessage={errors.name ? "name should be 2 characters or more" : null}
                                        />
                                        <Input isRequired label="Mac" placeholder="AA:AA:AA:AA:AA:AA" {...register('mac',
                                            { pattern: /(([0-9a-f]){2}:){5}([0-9a-f]){2}/i })}
                                            validationState={errors.mac ? "invalid" : "valid"}
                                            errorMessage={errors.mac ? "invalid mac address" : null}
                                        />
                                        <Input
                                            label="IP Address (Optional)"
                                            placeholder="Enter machines FQDN/IP address"
                                            {...register('address')}

                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" type="submit">
                                            Save
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </>
                        )
                    }}
                </ModalContent>
            </Modal>
        </>
    );
}