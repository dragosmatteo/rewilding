<?php

namespace App\Classes\Replace;

use Exception;
use Illuminate\Contracts\Container\BindingResolutionException;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

/**
 * This class is used to Replace tags in the given document(s)
 *
 * It uses the `pandoc` CLI tool to do this, along with the metavars filter
 * The command run will look like the following:
 *  pandoc -t docx -M Tag_Name:Replacement_Value --filter /path/to/metavars.py input.docx -o output.docx
 */
class Replace {
    /**
     * The paths to the generated documents
     * @var array $paths
     */
    protected $paths;
    /**
     * The tags which need replaced, and the replacement values
     * @var array $tags
     */
    protected $tags;

    public function __construct($paths, $tags)
    {
        if(is_array($paths)) {
            $this->paths = $paths;
        } else {
            $this->paths[0] = $paths;
        }
        $this->tags = $tags;
    }

    /**
     * Execute a search-and-replace function for the tags
     * @return void
     * @throws Exception
     */
    public function execute()
    {
        try {
            foreach($this->paths as $path) {

                # Build the arguments for the pandoc CLI command
                $args = $this->buildArgs($path);

                # Create a new CLI process with the args
                $pandocProcess = new Process($args);

                # Run the process
                $pandocProcess->run();

                # If the process wasn't successfull, throw an error
                if (!$pandocProcess->isSuccessful()) {
                    throw new ProcessFailedException($pandocProcess);
                }
            }
        } catch (\Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * Build the CLI arguments for the pandoc command
     *
     * @param string $path
     * @return array
     */
    protected function buildArgs(string $path): array
    {
        # Build the command-line arguments for the pandoc command.
        # Follow the structure in the comment in the top of the class
        $args = [
            '/usr/bin/pandoc',
            '-t',
            'docx',
        ];

        # Add the -M option for each individual tag
        foreach ($this->tags as $tag => $replace) {
            $args[] = '-M';
            $args[] = $tag . ':' . '"' . $replace . '"';
        }

        # Add the filter
        $args[] = '--filter';
        $args[] = storage_path("scripts/metavars.py");

        # Input document path
        $args[] = $path;

        # Output document path. At the moment it's the same as the input command
        $args[] = '-o';
        $args[] = $path;

        return $args;
    }
}