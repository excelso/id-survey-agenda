<?php

    namespace App\View\Components\Master\Karyawan;

    use App\Models\Master\Karyawan\User;
    use Closure;
    use Illuminate\Contracts\Foundation\Application;
    use Illuminate\Contracts\Support\Htmlable;
    use Illuminate\Contracts\View\Factory;
    use Illuminate\Contracts\View\View;
    use Illuminate\Support\Collection;
    use Illuminate\View\Component;

    class DataKaryawanApproval extends Component {
        public Collection $options;
        public string $class;
        public string $selected;
        public string $disabled;

        public function __construct($class, $selected = '', $disabled = '') {
            $this->options = User::where('role_id', 2)->get();
            $this->class = $class;
            $this->selected = $selected;
            $this->disabled = $disabled !== '' ? 'disabled' : '';
        }

        public function render() : View|Factory|Htmlable|string|Closure|Application {
            return view('components.master.dataKaryawan.dropdown-karyawan-approval');
        }
    }
