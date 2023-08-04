<select id="{{$id}}" class="form-control select2-custom {{$class}}" multiple="multiple" name="{{$name}}"
        data-selected="{{$selected}}" {{$disabled}}>
    @foreach ($options as $option)
        @php($sel = '')
        @if(isset($selected) && $selected != 'null')
            @if(in_array($option->npp, strtoarray(str_replace('&quot;', '', $selected))))
                <option selected value="{{ $option->npp }}">{{ $option->name }}</option>
            @else
                <option value="{{ $option->npp }}">{{ $option->name }}</option>
            @endif
        @else
            <option value="{{ $option->npp }}">{{ $option->name }}</option>
        @endif
    @endforeach
</select>

<?php
    function strtoarray($a, $t = '') {
        $arr = [];
        $a = ltrim($a, '[');
        $a = ltrim($a, 'array(');
        $a = rtrim($a, ']');
        $a = rtrim($a, ')');
        $tmpArr = explode(",", $a);
        foreach ($tmpArr as $v) {
            if ($t == 'keys') {
                $tmp = explode("=>", $v);
                $k = $tmp[0];
                $nv = $tmp[1];
                $k = trim(trim($k), "'");
                $k = trim(trim($k), '"');
                $nv = trim(trim($nv), "'");
                $nv = trim(trim($nv), '"');
                $arr[$k] = $nv;
            } else {
                $v = trim(trim($v), "'");
                $v = trim(trim($v), '"');
                $arr[] = $v;
            }
        }
        return $arr;
    }
?>
