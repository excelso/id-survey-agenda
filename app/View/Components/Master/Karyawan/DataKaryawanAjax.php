<?php

    namespace App\View\Components\Master\Karyawan;

    use Closure;
    use Illuminate\Contracts\Foundation\Application;
    use Illuminate\Contracts\Support\Htmlable;
    use Illuminate\Contracts\View\Factory;
    use Illuminate\Contracts\View\View;
    use Illuminate\View\Component;

    class DataKaryawanAjax extends Component {
        public string $class;
        public string $selected;
        public string $disabled;
        public string $name;

        public function __construct($class = '', $selected = '', $disabled = '', $name = '') {
            $this->class = $class;
            $this->selected = $selected;
            $this->disabled = $disabled != '' ? 'disabled' : '';
            $this->name = $name != '' ? $name : 'sales_npp';
        }

        public function render() : View|Factory|Htmlable|string|Closure|Application {
            return view('components.master.dataKaryawan.dropdown-karyawan-ajax');
        }
    }
