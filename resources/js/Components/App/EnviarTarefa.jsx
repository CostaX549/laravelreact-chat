import React, { useState } from 'react';
import MessageAttachments from '@/Components/App/MessageAttachments';
import { CalendarIcon, CheckCircleIcon, PaperClipIcon, XCircleIcon } from '@heroicons/react/24/solid';
import SecondaryButton from '../SecondaryButton';
import TextAreaInput from "@/Components/TextAreaInput";
import InputLabel from "@/Components/InputLabel";
import CustomAudioPlayer from "./CustomAudioPlayer";
import { isAudio, isImage } from "@/helpers";
import AttachmentPreview from "./AttachmentPreview";

const EnviarTarefa = ({ tarefa, attachmentClick, envio }) => {
    const [chosenFiles, setChosenFiles] = useState([]);
    const [descricaoEnvio, setDescricaoEnvio] = useState('');
    const [inputErrorMessage, setInputErrorMessage] = useState("");
    const [enviosUser, setEnviosUser] = useState(envio);
    const [isLoading, setIsLoading] = useState(false); 

    const onFileChange = (ev) => {
        const files = ev.target.files;
        const updatedFiles = [...files].map((file) => ({
            file: file,
            url: URL.createObjectURL(file)
        }));
        ev.target.value = null;
        setChosenFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
    };

    const enviar = () => {
        if (descricaoEnvio.trim() === "" && chosenFiles.length === 0) {
            setInputErrorMessage("Coloque uma descrição ou anexe envios.");
            setTimeout(() => {
                setInputErrorMessage("");
            }, 3000);
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        chosenFiles.forEach((file) => {
            formData.append("attachments[]", file.file);
        });
        formData.append("descricao", descricaoEnvio);

        axios.post(route("envio.store", tarefa.data), formData)
            .then((response) => {
                setEnviosUser(response.data.envio)
                setDescricaoEnvio("");
                setChosenFiles([]);
                setIsLoading(false);
              
            })
            .catch((error) => {
                setChosenFiles([]);
                const message = error?.response?.data?.message;
                setInputErrorMessage(message || "An error occured while sending the task");
            });
    };

   



    return (
        <div className="flex-1 p-10 rounded-lg shadow-md relative">
            <h1 className="text-2xl font-semibold mb-4">{tarefa.data.title}</h1>
            <p className="text-lg text-white-600 mb-2">{tarefa.data.description}</p>
            <div className="flex items-center text-lg text-white-600 mb-2">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>Data de Ínicio: {tarefa.data.start_date}</span>
            </div>
            <div className="flex items-center text-lg text-white-600 mb-4">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>Data de Entrega: {tarefa.data.end_date}</span>
            </div>
            <div className="mb-4 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">Anexos</h2>
                <MessageAttachments attachments={tarefa.data.attachments} attachmentClick={attachmentClick} justify="start" />
            </div>
            <div className="mb-4">
                {enviosUser ? (
                    <>
                        <h2 className="text-xl font-semibold mb-2">Arquivos Enviados</h2>
                        <MessageAttachments attachments={enviosUser.attachments} attachmentClick={attachmentClick} justify="start" />
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-semibold mb-2">Adicionar Envio</h2>
                        <button className="flex gap-2 cursor-pointer  p-1 text-gray-400 hover:text-gray-300 relative">
                            <PaperClipIcon className="w-6 cursor-pointer" />
                            Adicionar
                            <input
                                type="file"
                                onChange={onFileChange}
                                multiple
                                className="absolute left-0   top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"
                            />
                        </button>
                    </>
                )}
                <div className="flex flex-wrap gap-1 mt-2">
                    {chosenFiles.map((file) => (
                        <div
                            key={file.file.name}
                            className={`relative flex justify-between cursor-pointer ` + (!isImage(file.file) ? " w-[240px]" : "")}
                        >
                            {isImage(file.file) && (
                                <img
                                    src={file.url}
                                    alt=""
                                    className="w-32 h-32 object-cover"
                                />
                            )}
                            {isAudio(file.file) && (
                                <CustomAudioPlayer
                                    file={file}
                                    showVolume={false}
                                />
                            )}
                            {!isAudio(file.file) && !isImage(file.file) && (
                                <AttachmentPreview file={file} />
                            )}
                            <button
                                onClick={() => setChosenFiles(
                                    chosenFiles.filter((f) => f.file.name !== file.file.name)
                                )}
                                className="absolute w-6 h-6 rounded-full bg-gray-800 -right-2 -top-2 text-gray-300 hover:text-gray-100 z-10"
                            >
                                <XCircleIcon className="w-6" />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Descrição do Envio" />
                    {enviosUser ? (
                       <div className="border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300   rounded-md shadow-sm mt-1 block lg:w-[60%] h-40 md:w-full w-full p-2 overflow-y-auto">
                       {!enviosUser.descricao ? 'Nenhuma descrição' : enviosUser.descricao}
                     </div>
                    ) : (
                        <TextAreaInput
                            id="description"
                            className="mt-1 block lg:w-[60%] h-40 md:w-full w-full"
                            value={descricaoEnvio}
                            onChange={(e) => setDescricaoEnvio(e.target.value)}
                        />
                    )}
                    {inputErrorMessage && (
                        <p className="text-xs text-red-400">{inputErrorMessage}</p>
                    )}
                </div>
            </div>
            {enviosUser ? (
                <>
                <div className="flex flex-col items-center gap-1 absolute top-2 right-2 m-2">
                <SecondaryButton >
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Desfazer Entrega
                   
                </SecondaryButton>
                <p className="text-sm text-white-600 mb-2">Enviado as {enviosUser.created_at}</p>
                </div>
                </>
            ) : (
                <SecondaryButton onClick={enviar} className="absolute top-2 right-2 m-2" disabled={isLoading}>
                   
                    {isLoading ? (
                    <>
                       <span className="loading loading-spinner loading-sm mr-2"></span>
                        Entregando...
                    </>
                ) : (
                    <>
                    
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        Entregar
                    </>
                )}
                </SecondaryButton>
            )}
        </div>
    );
}

export default EnviarTarefa;
