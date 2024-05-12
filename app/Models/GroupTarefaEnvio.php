<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupTarefaEnvio extends Model
{
    use HasFactory;

    protected $fillable = ['descricao', 'tarefa_id', 'user_id'];

    public function attachments() {
        return $this->hasMany(GroupTarefaEnvioAttachment::class, "envio_id");
    }

}
