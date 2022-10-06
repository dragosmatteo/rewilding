<?php

namespace App\Classes\Contract;

use ZipArchive;
use Exception;
use Illuminate\Support\Facades\File;

class ContractsArchive {
    protected $storage;

    public function __construct()
    {
        $this->storage = storage_path('app/contracts/');
        $this->archiveDir = storage_path('app/contracts/archives/');
        
        if(! File::exists($this->archiveDir)) {
            mkdir($this->archiveDir);
        }
    }

    /**
     * Create contracts archive
     * 
     * @param array contracts
     * 
     * @return string archivePath
     */
    public function create($contracts)
    {
        $zip = new ZipArchive();
        $archiveName = $this->archiveDir . 'Contracts - ' . $contracts[0]['company'] . '.zip';
        $extension = $contracts[0]['extension'];

        if($zip->open($archiveName, ZipArchive::CREATE) !== true) {
            throw new Exception('Cannot create Zip Archive');
        }

        $zip->addEmptyDir('contracts');

        foreach($contracts as $contract) {
            $name = $contract['name'] . '.' . $extension;
            $zip->addFile($this->storage . $name, "contracts/{$name}");
        }

        $zip->close();

        return $archiveName;
    }
}
