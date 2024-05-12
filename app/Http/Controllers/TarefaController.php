<?php

namespace App\Http\Controllers;

use App\Http\Resources\TarefaResource;
use App\Models\Group;
use App\Models\GroupTarefa;
use App\Models\GroupTarefaAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redirect;

class TarefaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Group $group)
    {
        $tarefas = GroupTarefa::where("group_id", $group->id)->paginate(50);


        
        return inertia('GroupTarefas', [
            'selectedConversation' => $group->toConversationArray(),
            'tarefas' => TarefaResource::collection($tarefas)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Group $group, Request $request)
    {
       $data = $request->validate([
            'attachments.*' => 'nullable|array', 
            'description' => 'nullable',
            'title' => 'required', 
            'start_date' => 'required', 
            'end_date' => 'required', 
        ]);
    
      
    
        $data['start_date'] = Carbon::parse($data['start_date'])->startOfDay();
        $data['end_date'] = Carbon::parse($data['end_date'])->endOfDay();
    
        $data['group_id'] = $group->id;
        $attachments = $data['attachments'] ?? [];
        $files = array_map(function ($file) {
            return $file['file'];
        }, $attachments);
       
        $tarefa = GroupTarefa::create($data);

        $attachments = [];
        if($files) {
            foreach($files as $file) {
                $directory = 'attachments/' . Str::random(32);
                Storage::makeDirectory($directory);
                $model = [
                    'tarefa_id' => $tarefa->id,
                    'name' => $file->getClientOriginalName(),
                    'mime' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                    'path' => $file->store($directory, 'public')
                ];
                $attachment = GroupTarefaAttachment::create($model);
                $attachments[] = $attachment;
            }
            $tarefa->attachments = $attachments;
        }

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Group $group, GroupTarefa $tarefa)
    {
       
        return inertia('GroupTarefas', [
            'selectedConversation' => $group->toConversationArray(),
            'tarefa' => new TarefaResource($tarefa)
        ]);
    }

    public function deletarArquivo($id) {
      
     $attachment = GroupTarefaAttachment::findOrFail($id);
     $dir = dirname($attachment->path);
     Storage::disk('public')->deleteDirectory($dir);
     $attachment->delete();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GroupTarefa $tarefa)
    {
        
        $data = $request->validate([
            'attachments.*' => 'nullable|array', 
            'description' => 'nullable',
            'title' => 'required', 
            'start_date' => 'required', 
            'end_date' => 'required', 
        ]);
    
      
    
        $data['start_date'] = Carbon::parse($data['start_date'])->timezone('America/Sao_Paulo');
        $data['end_date'] = Carbon::parse($data['end_date'])->timezone('America/Sao_Paulo');

     
    
     
        $attachments = $data['attachments'] ?? [];
        $files = array_map(function ($file) {
            return $file['file'];
        }, $attachments);
       
       $tarefa->update($data);

        $attachments = [];
        if($files) {
            foreach($files as $file) {
                $directory = 'attachments/' . Str::random(32);
                Storage::makeDirectory($directory);
                $model = [
                    'tarefa_id' => $tarefa->id,
                    'name' => $file->getClientOriginalName(),
                    'mime' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                    'path' => $file->store($directory, 'public')
                ];
                $attachment = GroupTarefaAttachment::create($model);
                $attachments[] = $attachment;
            }
            $tarefa->attachments = $attachments;
        }

        return Redirect::back()->with([
            'tarefa' => new TarefaResource($tarefa)
        ]);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
