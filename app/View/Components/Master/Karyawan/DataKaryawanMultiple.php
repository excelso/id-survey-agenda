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

    class DataKaryawanMultiple extends Component {
        public Collection $options;
        public string $class, $id;
        public string $selected;
        public string $disabled;
        public string $name;

        public function __construct($id = '', $class = '', $selected = '', $disabled = '', $name = '') {
            $this->options = User::get();
            $this->id = $id;
            $this->class = $class;
            $this->selected = $selected;
            $this->disabled = $disabled != '' ? 'disabled' : '';
            $this->name = $name != '' ? $name : 'user_npp';
        }

        public function render() : View|Factory|Htmlable|string|Closure|Application {
            return view('components.master.dataKaryawan.dropdown-karyawan-multiple');
        }
    }
