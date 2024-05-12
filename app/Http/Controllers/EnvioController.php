<?php

namespace App\Http\Controllers;

use App\Http\Resources\EnvioResource;
use App\Models\GroupTarefa;
use App\Models\GroupTarefaEnvio;
use App\Models\GroupTarefaEnvioAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EnvioController extends Controller
{
    public function enviar(GroupTarefa $tarefa, Request $request) {
        $data = $request->validate([
            'attachments' => 'nullable|array|max:10',
            'attachments.*' => 'file|max:1024000',
            'descricao' => 'required_if:attachments,null'
            
        ]);

        $files = $data['attachments'] ?? [];
        $data['tarefa_id'] = $tarefa->id;
        $data['user_id'] = auth()->user()->id;

        $envio = GroupTarefaEnvio::create($data);

        $attachments = [];
        if($files) {
            foreach($files as $file) {
                $directory = 'attachments/' . Str::random(32);
                Storage::makeDirectory($directory);
                $model = [
                     'envio_id' => $envio->id,
                     'name' => $file->getClientOriginalName(),
                     'mime' => $file->getClientMimeType(),
                     'size' => $file->getSize(),
                     'path' => $file->store($directory, 'public')
                ];
                $attachment = GroupTarefaEnvioAttachment::create($model);
                $attachments[] = $attachment;
            }
            $envio->attachments = $attachments;
        }
      
        return response()->json(['envio' => new EnvioResource($envio)]);
    }
}
