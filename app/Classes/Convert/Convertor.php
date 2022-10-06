<?php

namespace App\Classes\Convert;

class Convertor {
    protected $documents;
    protected $extension;

    public function __construct($documents, $extension)
    {
        if(is_array($documents))
            $this->documents = $documents;
        else
            $this->documents[0] = $documents;
        $this->extension = $extension;
    }

    public function execute()
    {
        $paths = [];
        if($this->extension == 'odt' || $this->extension == 'pdf' || $this->extension == 'rtf') {
            foreach($this->documents as $document) {
                    $paths[] = (new Soffice($document, $this->extension))->convert();
            }
        }
        // ob_flush();
        // ob_start();
        // print_r('     $document     '.PHP_EOL);
        // var_dump($document);
        // print_r('     $this->extension     '.PHP_EOL);
        // var_dump($this->extension);
        // print_r('     $paths     '.PHP_EOL);
        // var_dump($paths);
        // print_r('-------------------END OF execute-Convertor.php-------------------'.PHP_EOL);
        // file_put_contents("dump.txt", ob_get_flush());
        // $this->removeOriginal();

        return $paths;
    }

    protected function removeOriginal()
    {
        if(is_array($this->documents)) {
            foreach($this->documents as $document) {
                unlink($document);
            }
        } else {
            unlink($this->documents);
        }
    }
}