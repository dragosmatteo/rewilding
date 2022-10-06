<?php

namespace App\Http\Controllers;

use App\Classes\Contract\Contract;
use Exception;
use App\Classes\PrepareForDownloadPage;
use Illuminate\Http\Request;
use App\Classes\Contract\ContractsArchive;
use App\Models\Document;
use App\Models\Company;
use Illuminate\Support\Facades\File;

class ContractController extends Controller
{
    public function index()
    {
        return ['contracts' => Document::where('user_id', auth()->user()->id ?? null)->get()];
    }

    /**
     * Save contract to database
     */
    public function store($name, $company, $path)
    {
        $user = auth()->user()->id;
        $contract = new Document();

        $contract->name = $name;
        $contract->user_id = $user;
        $contract->company = $company;
        $contract->path = pathinfo($path, PATHINFO_FILENAME);
        $contract->extension = pathinfo($path, PATHINFO_EXTENSION);

        $contract->save();
    }

    public function contract()
    {
        // ob_flush();
        // ob_start();
        // ob_clean();
        // print_r('++++START OF CONTRACTCONTROLLER++++'.PHP_EOL);
        $documents_directory = public_path('documents');
        if (! File::exists($documents_directory)) {
            File::makeDirectory($documents_directory);
        };
        // var_dump('test');
        // var_dump(request()->all());
        $contract = new Contract(request()->all());
        // print_r('$contract'.PHP_EOL);
        // var_dump($contract);
        try {
            $new = $contract->create();
        } catch (\Exception $e) {
            throw new Exception($e->getMessage());
        } 
        // print_r('$documents_directory'.PHP_EOL);
        // print_r($documents_directory);
        // print_r('$new'.PHP_EOL);
        // var_dump(implode($new));
        // ob_flush();
        // ob_start();
        // var_dump('contract');

        // print_r('-------------------<Mbr>-------------------');
        // var_dump($new);
        // print_r('-------------------done-------------------');
        // file_put_contents("dump.txt", ob_get_flush());

        if(is_array($new)) {
            if(count($new) > 1) {
                $company = request()->get('businessName') . ' (' . request()->get('tradingName') . ')';
                $documents = new PrepareForDownloadPage($new, $company);
                // print_r('$company'.PHP_EOL);
                // print_r($company);
                // print_r('$documents'.PHP_EOL);
                // print_r($documents);
                return $documents->send();
                
            }
            // only one new contract, convert path to string
            $new = implode($new);
        }

        $contractData = request()->all();
        $contractData['path'] = $new;
        
        // print_r('$contractData'.PHP_EOL);
        // print_r($contractData);
        // print_r('-------------------done 2 create-Contreoller.php-------------------'.PHP_EOL);

        $deleteAfterSend = true;
        if(auth()->check()) {
            $deleteAfterSend = false;
            $this->storeContractToDB($contractData);
        }
        // print_r('get_class(response())'.PHP_EOL);
        // print_r(get_class(response()));
        // print_r('get_class_methods(response())'.PHP_EOL);
        // print_r(get_class_methods(response()));
        // print_r('response()'.PHP_EOL);
        // print_r(response());
        // print_r('response()->download($new)');
        // print_r(response()->download($new));
        // print_r('++++END OF CONTRACTCONTROLLER++++'.PHP_EOL);

        // file_put_contents("dump.txt", ob_get_flush());
        return response()->download($new)->deleteFileAfterSend($deleteAfterSend);
    }

    public function download($id)
    {
        // ob_flush();
        // ob_start();
        // var_dump('contract');
        // var_dump(request()->all());
        // print_r('-------------------<Mbr>-------------------');
        // var_dump($new);
        // print_r('-------------------done download-contactController-------------------'.PHP_EOL);
        // file_put_contents("dump.txt", ob_get_flush());
        return response()->download(storage_path("app/contracts/$id"));
    }

    /**
     * Download archive with all contracts from DownloadPage
     */
    public function downloadArchive(Request $request)
    {
        $contracts = $request->collect();

        $archive = ((new ContractsArchive)->create($contracts));
        $headers = [
            "Content-Type: application/zip",
            "Content-Disposition: attachment; filename=" . pathinfo($archive, PATHINFO_BASENAME),
            "Content-Length: " . filesize($archive)
        ];
        
        return response()->download($archive, null, $headers)->deleteFileAfterSend(true);
    }

    protected function storeContractToDB($data)
    {
        $name = $company = '';

        if(isset($data['contractType']) && $data['contractType'] === 'additional') {
            $company = "{$data['businessName']} ({$data['tradingName']})";
            $name = "$company - {$data['jurisdictionCountry']}";
        } else {
            $company = null;
            $topic = str_replace('.json', '', $data['tSelected']);
            $name = "{$data['jSelected']}, {$topic}";

            if(isset($data['companySelectedId']) && $data['companySelectedId'] !== 'null' && $data['companySelectedId'] !== 'undefined') {
                $company = Company::find($data['companySelectedId'])->name;
                $name = $company . ' - ' . $name;
            }
        }

        $this->store($name, $company, $data['path']);
    }

    public function destroy(Document $contract) {
        $contract->delete();

        // return redirect('/dashboard');
    }
    
}