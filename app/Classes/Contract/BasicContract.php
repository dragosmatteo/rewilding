<?php

namespace App\Classes\Contract;

use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use App\Classes\Document;

class BasicContract {
    public function __construct()
    {
        $this->contract = new Document();
        $this->section = $this->contract->addSection([
            'breakType' => 'continuous',
        ]);
        $this->listType = [
            'listType' => \PhpOffice\PhpWord\Style\ListItem::TYPE_NUMBER_NESTED
        ];
        $this->paragraphStyle = [
            'spaceAfter' => 200
        ];

        \PhpOffice\PhpWord\Settings::setOutputEscapingEnabled(true);
    }

    /**
     * Remove clauses from documents directory
     */
    protected function cleanDirectory()
    {
        (new FileSystem)->cleanDirectory(public_path("documents"));
    }

    /**
     * Adds a clause to the contract
    */
    protected function addToContract($clause, $depth = 0)
    {
        $this->section->addListItem($clause, $depth, null, $this->listType, $this->paragraphStyle);
    }

    /**
     * Save the contract in storage
     *
     * @param string    $name       The document name
     * @param array     $clauses    The paths to the clauses documents
     *
     * @return string               The path to the full document
    */
    protected function store(
        $name = null,
        $clauses = []
    )
    {
        # Set the name for the resulting document.
        if(!isset($name)) {
            $name = time() . '_contract';
        } else {
            $name = time() . "_${name}";
        }

        # Build the full(absolute) path for the final resulting document
        $path = storage_path("app/contracts/") . $name . '.docx';

        # Build the command-line arguments for the pandoc command.
        $args = [ '/usr/bin/pandoc' ];
        $args = array_merge($args, $clauses);
        $args[] = '-o';
        $args[] = $path;

        # Create a new CLI process with the args
        $pandocProcess = new Process($args);

        # Run the process
        $pandocProcess->run();

        # If the process wasn't successfull, throw an error
        if (!$pandocProcess->isSuccessful()) {
            throw new ProcessFailedException($pandocProcess);
        }

        # Clean the public documents directory
        $this->cleanDirectory();

        # Returh the path for the document
        return $path;
    }
}