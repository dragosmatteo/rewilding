<?php

namespace App\Classes;

use PhpOffice\PhpWord\TemplateProcessor;

class Template extends TemplateProcessor
{
    protected static function ensureMacroCompleted($macro)
    {
        if (substr($macro, 0, 2) !== '{' && substr($macro, -1) !== '}') {
            $macro = '{' . $macro . '}';
        }

        return $macro;
    }
}

?>