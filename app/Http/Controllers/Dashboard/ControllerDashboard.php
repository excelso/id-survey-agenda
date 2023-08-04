<?php

    namespace App\Http\Controllers\Dashboard;

    use App\Http\Controllers\Controller;
    use App\Models\AccountPlanning;
    use App\Models\Leads;
    use App\Models\Master\Customer;
    use App\Models\Master\Portofolio;
    use App\Models\Master\SalesActivityCategory;
    use App\Models\Master\Status;
    use App\Models\Master\UnitKerja;
    use Carbon\Carbon;
    use Illuminate\Contracts\Foundation\Application;
    use Illuminate\Contracts\View\Factory;
    use Illuminate\Contracts\View\View;

    class ControllerDashboard extends Controller {
        protected string $viewPath;

        public function __construct() {
            $this->viewPath = 'dashboard';
            Carbon::setLocale('id');
        }

        public function index(): Factory|View|Application {
            return view($this->viewPath . '.dashboard');
        }

    }
