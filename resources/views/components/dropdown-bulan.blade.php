<select class="form-control select2-custom {{$class}}" data-selected="{{$selected}}" {{$disabled}}>
    @foreach($dataBulan as $index => $val)
        @php($select = $index == $selected ? 'selected' : '')
        <option {{$select}} value="{{$index}}">{{$val}}</option>
    @endforeach
</select>
