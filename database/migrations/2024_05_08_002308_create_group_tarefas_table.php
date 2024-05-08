<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('group_tarefas', function (Blueprint $table) {
            $table->id();
            $table->foreignId("group_id")->constrained("groups")->onDelete("cascade");
            $table->string("description")->nullable();
            $table->string("title");
            $table->datetime("start_date");
            $table->datetime("end_date");
            $table->timestamps();
        });

        Schema::create('group_tarefa_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId("tarefa_id")->nullable()->constrained("group_tarefas");
            $table->string("name", 255);
            $table->string("path", 1024);
            $table->string("mime", 255);
            $table->integer("size");
            $table->timestamps();
        });

        Schema::create('group_tarefa_envios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tarefa_id')->constrained("group_tarefas")->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('descricao')->nullable();
            $table->timestamps();
        });

        Schema::create('group_tarefa_envio_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('envio_id')->nullable()->constrained('group_tarefa_envios');
            $table->string("name", 255);
            $table->string("path", 1024);
            $table->string("mime", 255);
            $table->integer("size");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('group_tarefas');
    }
};
