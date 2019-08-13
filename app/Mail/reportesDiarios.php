<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;


class reportesDiarios extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {   
        $hoy = date("d-m-Y",strtotime(now()));
        return $this->view('mail')
                    ->attachFromStorageDisk('reportes','/ProduccionDia '.$hoy.'.xlsx');
    }
}
