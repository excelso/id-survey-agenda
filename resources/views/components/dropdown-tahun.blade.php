<select class="form-control select2-custom {{$class}}" data-selected="{{$selected}}" {{$disabled}}>
    @foreach($periode as $item)
        @php($select = $item->periode == $selected ? 'selected' : '')
        <option {{$select}} value="{{$item->periode}}">{{$item->periode}}</option>
    @endforeach
</select>
