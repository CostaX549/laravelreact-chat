<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupTarefaEnvioAttachment extends Model
{
    use HasFactory;

    protected $fillable = [
        "envio_id",
        "name",
        "path",
        "mime",
        "size"
      ];
}
