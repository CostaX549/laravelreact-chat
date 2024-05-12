<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class EnvioAttachmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "envio_id" => $this->envio_id,
            "name" => $this->name,
            "mime" => $this->mime,
            "size" => $this->size,
            "url" => Storage::url($this->path),
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at
         ];
    }
}
