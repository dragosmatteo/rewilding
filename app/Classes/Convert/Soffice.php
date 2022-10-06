<?php

namespace App\Classes\Convert;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class Soffice {
    protected $document;
    protected $format;

    public function __construct($document, $format)
    {
        $this->document = $document;
        $this->format = $format;
    }

    public function convert() {
        $dir = storage_path('app/contracts/');
        $new = $dir . pathinfo($this->document, PATHINFO_FILENAME) . ".$this->format";
        $document = pathinfo($this->document, PATHINFO_BASENAME);
        // print_r('     $this->format     '.PHP_EOL);
        // var_dump($this->format);
        // print_r('     $dir . $document     '.PHP_EOL);
        // var_dump($dir . $document);
        $process = new Process(['soffice', '--convert-to', $this->format, $dir . $document, '--outdir', $dir]);
        // print_r('     $process     '.PHP_EOL);
        // var_dump($process);
        $process->run();

        # If the process wasn't successfull, throw an error
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }
        // print_r('-------------------done execute-Soffice.php-------------------'.PHP_EOL);

        return $new;
    }
}