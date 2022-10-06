<?php

namespace App\Classes;

use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\Element\Section;

class Document extends PhpWord
{
    private $sections = array();

    public function getSections() {
        return $this->sections;
    }

    public function addSection($style = null)
    {
        $section = new Section(count($this->sections) + 1, $style);
        return $this->addExistingSection(new Section(count($this->sections) + 1, $style));
    }

    public function addExistingSection(\PhpOffice\PhpWord\Element\Section $section)
    {
        $section->setPhpWord($this);
        $this->sections[] = $section;

        return $section;
    }
}

?>