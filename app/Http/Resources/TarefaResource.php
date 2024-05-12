<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class TarefaResource extends JsonResource
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
            "title" => $this->title, 
            "description" => $this->description,
            "owner_id" => $this->group->owner->id,
            "start_date" => Carbon::createFromFormat('Y-m-d H:i:s', $this->start_date)->format('d/m/Y H:i'),
            "end_date" => Carbon::createFromFormat('Y-m-d H:i:s', $this->end_date)->format('d/m/Y H:i'),
            "formatted_start_date" => $this->start_date,
            "formatted_end_date" => $this->end_date,
           
            'attachments' => GroupTarefaAttachmentResource::collection($this->attachments),
            "group_id" => $this->group_id,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "enviosUser" => new EnvioResource($this->enviosUser)
           
        ];
    }
}
