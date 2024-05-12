import TextAreaInput from "@/Components/TextAreaInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import UserPicker from "@/Components/App/UserPicker";
import { useEventBus } from "@/EventBus";
import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import Modal from "../Modal";
import { useForm } from "@inertiajs/react";
import Datepicker from "react-tailwindcss-datepicker";
import AttachmentPreview from "./AttachmentPreview";
import CustomAudioPlayer from "./CustomAudioPlayer";
import { isAudio, isImage } from "@/helpers";
import { XCircleIcon } from "@heroicons/react/24/solid";


export default function TarefaModal({ group, show = false, onClose = () => {} }) {
    const { emit } = useEventBus();
    const { data, setData, processing, reset, post, errors } = useForm({
        title: "",
        description: "",
        start_date: null,
        end_date: null,
        attachments: []
    });

    const handleValueChange = (newValue) => {
        setData({
            ...data,
            start_date: newValue.startDate,
            end_date: newValue.endDate
        });
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("group.tarefas.store", group), {
            onSuccess: () => {
                emit("toast.show", `Tarefa "${data.title}" was created`);
                closeModal();
            },
            onError: (e) => {
                console.error(e);
            }
        });
    };

    const closeModal = () => {
        reset();
        onClose();
    };

    const onFileChange = (ev) => {
        const files = ev.target.files;
        const updatedFiles = [...files].map((file) => {
            return {
                file: file,
                url: URL.createObjectURL(file)
            };
        });
        ev.target.value = null;

        setData({
            ...data,
            attachments: [...data.attachments, ...updatedFiles]
        });
    };

    return (
        <Modal show={show} onClose={closeModal}>
            <form onSubmit={submit} className="p-6 overflow-y-auto">
                <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                    Criar Tarefa
                </h2>
                <div className="mt-8">
                    <InputLabel htmlFor="name" value="Título" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        required
                        isFocused
                    />
                    <InputError className="mt-2" message={errors.title} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Descrição" />
                    <TextAreaInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        required
                    />
                     <InputError className="mt-2" message={errors.description} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="date" value="Data de Ínicio e Entrega" />
                    <Datepicker
                        displayFormat={"DD/MM/YYYY"}
                        placeholder={"Data de Ínicio e Entrega"}
                        value={{ startDate: data.start_date, endDate: data.end_date }}
                        onChange={handleValueChange}
                        showShortcuts={true}
                    />
                  
                    <InputError className="mt-2" message={errors.start_date} />
                    <InputError className="mt-2" message={errors.end_date} />
                </div>
                <div className="mt-4 text-white">
                    <InputLabel htmlFor="arquivo" value="Anexos" />
                    <input   multiple type="file" id="arquivo" className="file-input file-input-bordered file-input-primary w-full max-w-xs mt-2" onChange={onFileChange} />
                    <div className="flex flex-wrap gap-1 mt-2">
                        {data.attachments.map((file, index) => (
                            <div
                                key={index}
                                className={`relative flex justify-between cursor-pointer ` + (!isImage(file.file) ? " w-[240px]" : "")}
                            >
                                {isImage(file.file) && (
                                    <img src={file.url} alt="" className="w-16 h-16 object-cover" />
                                )}
                                {isAudio(file.file) && <CustomAudioPlayer file={file} showVolume={false} />}
                                {!isAudio(file.file) && !isImage(file.file) && <AttachmentPreview file={file} />}
                                <button
                                    onClick={() =>
                                        setData({
                                            ...data,
                                            attachments: data.attachments.filter((_, i) => i !== index)
                                        })
                                    }
                                    className="absolute w-6 h-6 rounded-full bg-gray-800 -right-2 -top-2 text-gray-300 hover:text-gray-100 z-10"
                                >
                                    <XCircleIcon className="w-6" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                    <PrimaryButton className="ms-3" disabled={processing}>
                        Create
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
