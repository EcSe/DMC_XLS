<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\reportesDiarios;
use App\Http\Controllers\informeController;

class sendmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sendmail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envia reportes diarios cada dia a las 20:30';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

  
    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $informeControl = new informeController();
        $informeControl->exportInformeDiario();
        Mail::to('spamecse@icloud.com')->send(new reportesDiarios());

    }
}
