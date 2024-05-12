import React, { useState,  useMemo } from 'react';
import MessageAttachments from '@/Components/App/MessageAttachments';
import { CalendarIcon, CheckCircleIcon, PaperClipIcon, XCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import SecondaryButton from '../SecondaryButton';
import TextAreaInput from "@/Components/TextAreaInput";
import InputLabel from "@/Components/InputLabel";
import CustomAudioPlayer from "./CustomAudioPlayer";
import { isAudio, isImage } from "@/helpers";
import AttachmentPreview from "./AttachmentPreview";
import TextInput from '../TextInput';
import { useForm } from '@inertiajs/react';
import Datepicker from 'react-tailwindcss-datepicker';
import InputError from '../InputError';
import { useEventBus } from '@/EventBus';
import ReactDateTimePicker from 'react-tailwindcss-datetimepicker';


const EditarTarefa = ({ tarefa, attachmentClick }) => {
   


  const { emit } = useEventBus()

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

    function formatDate(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(date).toLocaleString('pt-BR', options).replace(',', '');
    }

    const { data, setData, processing, reset, post, errors } = useForm({
        title: tarefa.data.title,
        description: tarefa.data.description,
        start_date: new Date(tarefa.data.formatted_start_date),
        end_date: new Date(tarefa.data.formatted_end_date),
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
        
        post(route("tarefa.edit", tarefa.data), {
            onSuccess: (res) => {
            
               
                emit("toast.show", `Tarefa "${data.title}" was edited`);
                setData("attachments", []);
                emit("attachments", { attachments: res.props.tarefa.data.attachments })
             

            },
            onError: (e) => {
                console.error(e);
            }
        });
    };
  
    const locale = {
        format: 'dd-MM-yyyy HH:mm', 
        sundayFirst: false,
        days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        months: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
        ],
        fromDate: 'De Data',
        toDate: 'Até Data',
        selectingFrom: 'Selecionando De',
        selectingTo: 'Selecionando Até',
        maxDate: 'Data Máxima',
        close: 'Fechar',
        apply: 'Aplicar',
        cancel: 'Cancelar',
    };

    const handleDateTimeChange = (startDate, endDate) => {
        setData({
            ...data,
            start_date: startDate,
            end_date: endDate
        });
    };

    return (
        <form onSubmit={submit} className="flex-1 p-10 rounded-lg shadow-md relative">
    <div className="flex flex-col gap-1 lg:w-[50%]  sm:w-full ">
    <InputLabel htmlFor="title" value="Título" />
    <TextInput 
        id="title"  
        value={data.title}
        onChange={(e) => setData("title", e.target.value)} 
        className="text-2xl font-semibold mb-4 " />
           <InputError className="mt-2" message={errors.title} />
    <InputLabel htmlFor="description" value="Descrição" />           
    <TextAreaInput 
        id="description" 
        value={data.description} 
        onChange={(e) => setData("description", e.target.value)}  
        className="text-lg text-white-600 mb-2  " />
         <InputError className="mt-2" message={errors.description} />
     
    <div className="mb-10">
        <InputLabel htmlFor="datepicker" value="Data de Ínicio e Entrega" />   
        <ReactDateTimePicker
            start={data.start_date}
            end={data.end_date}
            className="z-50"
            locale={locale}
           
            twelveHoursClock={false}
            applyCallback={handleDateTimeChange}
        > <TextInput 
        placeholder="Data de Ínicio e Entrega"   
        className="w-full    cursor-pointer"  
        value={`${formatDate(data.start_date)} ~ ${formatDate(data.end_date)}`}  
        onChange={() => {}}
    /></ReactDateTimePicker>
        <InputError className="mt-2" message={errors.start_date} />
          <InputError className="mt-2" message={errors.end_date} />
    </div>
</div>
          
            <div className="mb-4 flex flex-col">
              
                <h2 className="text-xl font-semibold mb-2">Anexos</h2>
              
                <MessageAttachments attachments={tarefa.data.attachments} editing={true} attachmentClick={attachmentClick} justify="start" />
            </div>
            <div className="mb-4">
               
                        <h2 className="text-xl font-semibold mb-2">Adicionar Mais Anexos</h2>
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
          
          
                <SecondaryButton  type="submit" className="absolute top-2 right-2 m-2" disabled={processing}>
                   
                    {processing ? (
                    <>
                       <span className="loading loading-spinner loading-sm mr-2"></span>
                        Editando...
                    </>
                ) : (
                    <>
                    
                        <PencilSquareIcon className="h-5 w-5 mr-2" />
                        Editar
                    </>
                )}
                </SecondaryButton>
           
        </form>
    );
}

export default EditarTarefa;
