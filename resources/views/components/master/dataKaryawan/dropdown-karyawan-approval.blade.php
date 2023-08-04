<select class="form-control select2-custom {{$class}}" data-selected="{{$selected}}" {{$disabled}}>
    <option value="">...</option>
    @foreach ($options as $option)
        @php($sel = isset($selected) && $option->npp == $selected ? 'selected' : '')
        <option {{$sel}} value="{{ $option->npp }}">{{ $option->name }}</option>
    @endforeach
</select>
