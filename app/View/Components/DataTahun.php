<?php

    namespace App\View\Components;

    use App\Models\Master\PeriodeAccount;
    use Closure;
    use Illuminate\Contracts\Foundation\Application;
    use Illuminate\Contracts\Support\Htmlable;
    use Illuminate\Contracts\View\Factory;
    use Illuminate\Contracts\View\View;
    use Illuminate\Support\Collection;
    use Illuminate\View\Component;

    class DataTahun extends Component {
        public $periode;
        public string $class;
        public string $selected;
        public string $disabled;

        public function __construct($class, $selected = '', $disabled = '') {
            $this->periode = json_decode(json_encode([['periode' => 2023]]));
            $this->class = $class;
            $this->selected = $selected;
            $this->disabled = $disabled !== '' ? 'disabled' : '';
        }

        public function render() : View|Factory|Htmlable|string|Closure|Application {
            return view('components.dropdown-tahun');
        }
    }
