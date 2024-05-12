<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class EnvioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'descricao' => $this->descricao,
            'tarefa_id' => $this->tarefa_id,
            'user_id' => $this->user_id,
            'attachments' => EnvioAttachmentResource::collection($this->attachments),
            "created_at" => Carbon::parse($this->created_at)->timezone('America/Sao_Paulo')->format('d/m/Y H:i'),
            "updated_at" => Carbon::parse($this->updated_at)->timezone('America/Sao_Paulo')->format('d/m/Y H:i'),
        ];
    }
}
