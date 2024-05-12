<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class GroupTarefa extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'start_date', 'end_date', 'group_id'];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime'
    ];

    protected $appends = [
        'enviosUser'
    ];

   


    public function group() {
        return $this->belongsTo(Group::class, "group_id");
    }

    public function attachments() {
        return $this->hasMany(GroupTarefaAttachment::class, "tarefa_id");
    }
    public function envios() {
        return $this->hasMany(GroupTarefaEnvio::class, "tarefa_id");
    }

  

    public function getEnviosUserAttribute()
    {
        $userId = Auth::id();
        $envios =  $this->envios()->where('user_id', $userId)->first();
        return $envios ? $envios : null;
    }

   
}
