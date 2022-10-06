<?php

namespace App\Classes\Contract;

use Exception;
use App\Classes\Convert\Convertor;
use App\Classes\Replace\Replace;

class Contract {
    protected $data;
    protected $type;
    protected $format;

    public function __construct($data)
    {
        $this->data = $data;
        $this->format = $data['output'];

        if(request()->is('api/*')) {
            $this->type = 'apiMain';
        } else {
            (isset($this->data['contractType'])) ? $this->type = $this->data['contractType'] : $this->type = "main";
        }
    }

    public function create()
    {
        if($this->type == 'additional') {
            $contract = (new AdditionalContract($this->data));
        } else if ($this->type == 'apiMain') {
            $contract = new ApiMainContract($this->data);
        } else {
            $contract = new MainContract($this->data);
        }
        // var_dump($this->type);
        try {
            $new = $contract->create();
            $tags = $contract->getTags();
            if(count($tags) > 0) {
                (new Replace($new, $tags))->execute();
            }
            ($this->format !== 'docx') ? $new = (new Convertor($new, $this->format))->execute() : [];
            // print_r('-------------------END OF Create-Contract.php-------------------'.PHP_EOL);
        } catch (\Exception $e) {
            throw new Exception($e->getMessage());
        }

        return $new;
    }
}